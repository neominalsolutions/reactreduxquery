import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RefetchOptions, useQuery } from '@tanstack/react-query';
import { Product } from '../store/features/ProductSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { CartItem, addToCart } from '../store/features/CartSlice';

function ProductListQueryDemo() {
	// veri çekme işlemlerini useQuery üstleniyor
	// useEffect hook kullanmamıza gerek kalmıyor.
	// load işleminde data çekmeyi useQuery bıraktık
	// veri çekme işlemlerinde direkt statelerden yararlanırız.
	// eğer veriye ulaşmada bir hata meydana gelirse ilk gönderimden sonra 3 kere daha default da deniyor, 3 hata sonrasında hata kodunu gösteriyor. Retry policy ile

	const [products, setProducts] = useState<Product[]>([]);
	const [depId, setDepId] = useState<number>(0); // depId değişirse veri tekrardan yüklenir.
	// 'FetchProducts', depId queryKey dinamik değere göre değişim yapar ve aynı verinin güncellenmesi gerektini anladığı için tekrar verinin çekilmesini fetch edilmesini otomatik olarak tetikler.

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		console.log('depId değişti');
	}, [depId]); // queryKey: ['FetchProducts', depId], aynı yazım.

	const { isLoading, data, isFetched, error, isSuccess, refetch } = useQuery({
		queryKey: ['FetchProducts', depId], // otomatik olarak bu key üzerinden 5 dakikaklık bir cache atıyor,
		queryFn: async () => {
			return (
				await axios.get(
					'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
				)
			).data.value;
		},
		select(data) {
			// veri transform işlemi
			// on success öncesi an
			console.log('data', data);
			// setProducts(data);
			return data;
		},
		// onSuccess: (response: any) => {
		// 	// response interceptor
		// 	// genelde post,put,delete işlemlerinde kullanırız. işlem sonrası toastr message gösterme gibi durumlar olabilir
		// get isteğinden yeni verisyonda onSuccess,OnError kaldırılmış.
		// 	setProducts(response);
		// 	console.log('response', response);
		// },
		// onError(err) {
		// 	// console.log('error', err);
		// },
		retry: 2, // hata durumunda 2 kez arka arkaya istek at
		refetchInterval: 6000, // arka planda belirli bir süre içerisinde veriyi çekmemizi sağlar.
		//cacheTime: 10000 * 60, // 10 dk cachede kalsın, yeni versiyonda gcTime olarak kullanılıyor.cacheTime
		gcTime: 5000,
	});

	useEffect(() => {
		// data değişime uğrayınca bir şey çalışır
		setProducts(data);
	}, [data]);

	if (isLoading) return <>... Loading</>;

	if (error) return <>Hata Meydana geldi!</>;

	return (
		products && (
			<>
				{products.map((item: Product) => {
					return (
						<div key={item.ProductID}>
							{item.ProductName} {item.UnitPrice}
							<button
								onClick={() => {
									dispatch(
										addToCart({
											id: item.ProductID,
											name: item.ProductName,
											quantity: 1,
											price: parseFloat((item.UnitPrice * 1.1).toFixed(2)),
										} as CartItem)
									);
								}}
							>
								Sepete Ekle
							</button>
							<button
								onClick={() => {
									const filteredData = products.filter(
										(x: any) => x.ProductID !== item.ProductID
									);
									console.log('filteredData', filteredData);
									setProducts([...filteredData]);
								}}
							>
								Sil
							</button>
							<button
								onClick={() => {
									// yeni versiyonda biraz sorunlu dökümandan bir bakalım v3 de çalışıyor.
									// refetch({
									// 	cancelRefetch: false,
									// });
								}}
							>
								Yeniden Yükle (Reflesh)
							</button>
						</div>
					);
				})}

				<button
					onClick={() => {
						setDepId(Math.round(Math.random() * 100));
					}}
				>
					DepId: {depId}
				</button>
			</>
		)
	);
}

export default ProductListQueryDemo;
