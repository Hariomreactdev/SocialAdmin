import { Chance } from 'chance';
import mock from '../mock';
import user2 from '@/assets/images/profile/user-2.jpg';
import type { ContactType } from '@/types/apps/contact';
import store from '@/store/Store';
import { addContact } from '@/store/apps/contacts/ContactSlice';

const chance = new Chance();

export const ContactList: ContactType[] = [];

mock.onGet('/api/data/contacts/ContactsData').reply(() => {
  const contacts = store.getState().contactsReducer.contacts;

  return [200, JSON.parse(JSON.stringify(contacts))];
});

mock.onPost('/api/data/contacts/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  const contacts = store.getState().contactsReducer.contacts;
  const user = contacts.find((item) => item.email === email);
  if (user && user.password === password) {
    return [200, user];
  } else {
    return [401, { message: 'Invalid email or password' }];
  }
});

mock.onPost('/api/data/contacts/new').reply((config) => {
  const { firstName, lastName, department, email, phone } = JSON.parse(config.data);
  const createdObject = {
    id: store.getState().contactsReducer.contacts.length + 1,
    firstname: firstName,
    lastname: lastName,
    image: user2,
    department: department,
    company: 'Muller Inc',
    phone: phone,
    email: email,
    address: '19214 110th Rd, Saint Albans, NY, 1141',
    notes: chance.paragraph({ sentences: 2 }),
    frequentlycontacted: true,
    role: 'SELLER',
    starred: true,
    deleted: false,
    password: '123456',
    token: btoa(`${firstName}${lastName}`),
  };

  store.dispatch(
    addContact(
      createdObject.id,
      createdObject.firstname,
      createdObject.lastname,
      createdObject.image,
      createdObject.department,
      createdObject.company,
      createdObject.phone,
      createdObject.email,
      createdObject.address,
      createdObject.notes,
      createdObject.role,
      createdObject.password,
      createdObject.token,
    ),
  );

  return [201, createdObject];
});

export default ContactList;
