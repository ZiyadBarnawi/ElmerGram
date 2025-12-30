import { User } from '../models/user.model';

export let user: User = {
  username: 'Ziyad',
  phoneNumber: '',
  email: 'Ziyad@mail.com',
  password: 'Ziyad12',
  pfpUrl: 'blob:http://localhost:4200/e87fe9cf-957f-4074-b7d9-ae1027046ca1',

  bio: '',
  dateOfBirth: '2025-12-10T21:00:00.000Z',
  gender: 'male',
  city: 'Mecca',
  commercialPaper: 'blob:http://localhost:4200/54e033e6-772f-4565-a29c-c64f4319032a',
  commercialRegistryNumber: '121212',
  iban: '121212',
  accountType: 'business',
  paymentMethods: ['stcPay', 'Mada', 'googlePay'],
  products: [
    { name: 'Demo1', price: '111', categories: 'Cloths', discounts: 'Random Discount' },
    { name: 'Demo22', price: '121212', categories: 'Glasses', discounts: 'new discount' },
  ],
  workHours: [
    {
      day: 'Saturday',
      available: true,
      flexible: true,
      openHours: '2025-12-30T07:58:57.038Z',
      closeHours: '2025-12-30T09:59:59.621Z',
    },
    { day: 'Sunday', available: false, flexible: false, openHours: '', closeHours: '' },
    { day: 'Monday', available: false, flexible: false, openHours: '', closeHours: '' },
    { day: 'Tuesday', available: false, flexible: false, openHours: '', closeHours: '' },
    {
      day: 'Wednesday',
      available: true,
      flexible: true,
      openHours: '2025-12-30T09:00:08.159Z',
      closeHours: '2025-12-30T13:00:12.638Z',
    },
    { day: 'Thursday', available: false, flexible: false, openHours: '', closeHours: '' },
    { day: 'Friday', available: false, flexible: false, openHours: '', closeHours: '' },
  ],
};
