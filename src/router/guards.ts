import { isAuthenticated } from "../services/authService";

export const authGuard = () => {
  if (!isAuthenticated()) {
    return "/login";
  }

  return true;
};

export const guestGuard = () => {
  if (isAuthenticated()) {
    return "/transactions";
  }

  return true;
};