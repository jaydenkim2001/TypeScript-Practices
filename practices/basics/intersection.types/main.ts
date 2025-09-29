type TProduct = {
  id: string;
  name: string;
  price: number;
};

type TDiscountedProduct = TProduct & { discountRation: number };

interface IProduct {
  id: string;
  name: string;
  price: number;
}

interface IDiscountedProduct extends IProduct {
  discountRation: number;
}

//=================================================================================================================

type TPopularity = {
  rate: Number;
};

interface IReview {
  review: number;
}

type TFilter = TPopularity & IReview;

let filter: TFilter = {
  rate: 2.3,
  review: 3,
};

interface IFilter extends TPopularity, IReview{}
//=================================================================================================================

