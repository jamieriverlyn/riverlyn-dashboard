export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Claimant = {
    id: string;
    name: string;
    email: string;
    entity_type: 'company' | 'individual' | 'heir';
    image_url: string;
};

export type Company = {
    id: string;
    name: string;
    email: string;
};


export type Individual = {
    id: string;
    name: string;
    email: string;
};

export type Heir = {
    id: string;
    name: string;
    email: string;
};


export type Statement = {
    id: string;
    claimant_id: string;
    amount: number;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'not initiated' | 'mailed' | 'claimant response' | 'processing by state' | 'pending payment' | 'paid';
};

export type Revenue = {
    [x: string]: number;
    month: string;
    revenue: number;
};

export type LatestStatement = {
    id: string;
    name: string;
    image_url: string;
    email: string;
    amount: string;
};

export type LatestStatement = Omit<LatestStatement, 'amount'> & {
    amount: number;
  };

  export type StatementTable = {
    id: string;
    customer_id: string;
    name: string;
    email: string;
    image_url: string;
    date: string;
    amount: number;
    status: 'not initiated' | 'mailed' | 'claimant response' | 'processing by state' | 'pending payment' | 'paid';
  };
  

  export type ClaimantTableType = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: number;
    total_paid: number;
  };
  
  export type FormattedClaimantTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: string;
    total_paid: string;
  };
  
  export type ClaimantField = {
    id: string;
    name: string;
  };
  
  export type StatementForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: 'not initiated' | 'mailed' | 'claimant response' | 'processing by state' | 'pending payment' | 'paid';
  };
  