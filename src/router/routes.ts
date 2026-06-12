import LoginView from "../views/LoginView.vue";
import TransactionView from "../views/TransactionView.vue";
import TransactionForm from "../views/TransactionForm.vue";
import TransactionEdit from "../views/TransactionEdit.vue";
import { authGuard, guestGuard } from "./guards";

export const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: LoginView,
    beforeEnter: guestGuard,
  },
  {
    path: "/transactions",
    component: TransactionView,
    beforeEnter: authGuard,
  },
  {
    path: "/transactions/create",
    component: TransactionForm,
    beforeEnter: authGuard,
  },
  {
    path: "/transactions/:id/edit",
    component: TransactionEdit,
  },
];
