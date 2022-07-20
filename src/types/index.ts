export interface ISt {
  addressTo: string;
  addressFrom: string;
  timestamp: any;
  message?: string;
  keyword?: string;
  amount: any;
}

export interface Val {
  currentAccount: string;
  connectWallet: () => Promise<void>;
  sendTransaction: () => Promise<void>;
  formData: {
    addressTo: string;
    amount: string;
    keyword: string;
    message: string;
  };
  isLoading: boolean;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      addressTo: string;
      amount: string;
      keyword: string;
      message: string;
    }>
  >;
  transactions: ISt[];
}

export interface IState {
  transactions: ISt[];
}
