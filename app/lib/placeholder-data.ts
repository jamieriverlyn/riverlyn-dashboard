const users = [
    {
        id: '410544b2-4001-4271-9855-acca',
        name: 'Jamie Gammel',
        email: 'flowofemotions11@gmail.com',
        password: 'admin123456',
    },
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    }
];

const claimants = [
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        name: 'Evil Rabbit',
        email: 'evil@rabbit.com',
        entity_type: 'individual',
        image_url: '/claimant/evil-rabbit.png',
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        name: 'San Diego Gas & Electric',
        email: 'sdge@gmail.com',
        entity_type: 'company',
        image_url: '/claimant/balazs-orban.png',
    },
   {   
        id: 'd6e15727-9fe1-4961j1jj3lmfk-1aa',
        name: 'Mary Kay',
        email: 'marykay@gmail.com',
        entity_type: 'individual',
        image_url: '/claimant/amy-burns.png',
    },
    {
        id: 'd6e15727-9fe1-4961j1jj3lmfk-1aa',
        name: 'Tiffany Bingham',
        email: 'binghamtiff@gmail.com',
}
];

const companies = [
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        name: 'San Diego Gas & Electric',
        email: 'sdge@gmail.com',
    }
];

const individuals = [
    {   
        id: 'd6e15727-9fe1-4961j1jj3lmfk-1aa',
        name: 'Mary Kay',
        email: 'marykay@gmail.com',
    
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        name: 'Evil Rabbit',
        email: 'evil@rabbit.com',
    }   
];

const heirs = [
    {
            id: 'd6e15727-9fe1-4961j1jj3lmfk-1aa',
            name: 'Tiffany Bingham',
            email: 'binghamtiff@gmail.com',
    }
];

const statements = [
        {
            claimant_id: claimants[0].id,
            amount: 15795,
            status: 'pending',
            date: '2022-12-06',
          },
          {
            claimant_id: claimants[1].id,
            amount: 20348,
            status: 'pending',
            date: '2022-11-14',
          },
     
          {
            claimant_id: claimants[0].id,
            amount: 666,
            status: 'pending',
            date: '2023-06-27',
          },
          {
            claimant_id: claimants[3].id,
            amount: 32545,
            status: 'paid',
            date: '2023-06-09',
          },
    
   
          {
            claimant_id: claimants[1].id,
            amount: 500,
            status: 'paid',
            date: '2023-08-19',
          },
          {
            claimant_id: claimants[2].id,
            amount: 1000,
            status: 'paid',
            date: '2022-06-05',
          },
];

const revenue = [

        { month: 'Jan', revenue: 2000 },
        { month: 'Feb', revenue: 1800 },
        { month: 'Mar', revenue: 2200 },
        { month: 'Apr', revenue: 2500 },
        { month: 'May', revenue: 2300 },
        { month: 'Jun', revenue: 3200 },
        { month: 'Jul', revenue: 3500 },
        { month: 'Aug', revenue: 3700 },
        { month: 'Sep', revenue: 2500 },
        { month: 'Oct', revenue: 2800 },
        { month: 'Nov', revenue: 3000 },
        { month: 'Dec', revenue: 4800 },
];

export { users, claimants, statements, revenue }




