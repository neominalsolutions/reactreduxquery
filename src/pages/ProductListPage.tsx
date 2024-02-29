import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {
	Product,
	ProductState,
	fetchProducts,
} from '../store/features/ProductSlice';

function ProductListPage() {
	const dispatch = useDispatch<AppDispatch>();

	// asrenkron veri clientstate dispatch ile aktralıdığın artık clientstate dönüşür senkron bir veri haline gelir. bizde veriyi state üzerinden çekip ekran basıyoruz.
	const productState = useSelector<RootState>(
		(state) => state.productState
	) as ProductState;

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	if (productState.isLoading) {
		return <><br></br>Yükleme Yapılıyor</>;
	}

	if (productState.error) {
		return <><br></br>{productState.error.message}</>;
	}

	if (productState.fetched) {
		return (
			<>
				{productState.products.map((item: Product) => {
					return <div key={item.ProductID}>{item.ProductName}</div>;
				})}
			</>
		);
	}

	return <></>;
}

export default ProductListPage;
