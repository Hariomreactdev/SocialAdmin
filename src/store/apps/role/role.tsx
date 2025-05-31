import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateType {
  roles: any | [];
}

const initialState: StateType = {
  roles: [
    {
      id: 1,
      slug: 'subadmin',
      name: 'Sub Admin',
    },
    {
      id: 2,
      slug: 'staff',
      name: 'Staff',
    },
  ],
};

export const RoleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    AddRole: (state, action: PayloadAction<any>) => {
      state.roles = action.payload;
    },
    DeleteRole: (state) => {
      state.roles = null;
    },
  },
});

export const { AddRole, DeleteRole } = RoleSlice.actions;
export default RoleSlice.reducer;
