export type GenericShopwareResponse = {
  _data: {
    errors: {
      code: string;
      detail: string;
      status: string;
      title: string;
    };
  };
} & Response;
