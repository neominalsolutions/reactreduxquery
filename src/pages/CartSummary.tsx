import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CartItem } from '../store/features/CartSlice';

function CartSummary() {
	const cartState = useSelector((state: RootState) => state.cartState);

	return (
		<div>
			{cartState.items && (
				<>
					{cartState.items.map((item: CartItem) => {
						return (
							<div key={item.id}>
								{item.name} x {item.quantity}
								<button
									onClick={() => {
										//removeFromCart feature uygulanacaktır.
									}}
								>
									Sepetten Çıkar
								</button>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
}

export default CartSummary;
