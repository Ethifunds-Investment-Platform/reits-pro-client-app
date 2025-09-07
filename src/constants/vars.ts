export type EnvironmentVariables = {
	base_url: string;
	server: string;
	socket: string;
	socket_url: string;
};

export type StorageKeys = {
	email: string;
	session: string;
	remember_me: string;
	currency: string;
};

export type Environment = "production" | "development";
const NODE_ENV: Environment = import.meta.env.VITE_SERVICE_ENV || "production";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";
const SERVER = BASE_URL + "/api/v1";
const SOCKET = "";
const SOCKET_URL = ``;

const STORAGE: StorageKeys = {
	email: "_et_email",
	session: "_et_session",
	remember_me: "_et_rme",
	currency: "_et_currency",
};



const ACTIVE: EnvironmentVariables = {
	base_url: BASE_URL,
	server: SERVER,
	socket: SOCKET,
	socket_url: SOCKET_URL,
};

const CONTACTS = {
	phone: "0814 444 4444",
	support_email: "support@ethifunds.com",
	partner_with_us: "",
};

const PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY || "";
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

const PAYSTACK = {
  secret_key: PAYSTACK_SECRET_KEY,
  public_key: PAYSTACK_PUBLIC_KEY,
  charge_amount: 1000,
};

const INACTIVE_LIMIT = 5;

export {
  NODE_ENV,
  ACTIVE,
  BASE_URL,
  SERVER,
  SOCKET,
  SOCKET_URL,
  INACTIVE_LIMIT,
  STORAGE,
  CONTACTS,
  PAYSTACK,
};
