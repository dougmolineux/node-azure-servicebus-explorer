export interface Connection {
  connString: string;
  topic: string;
  sub: string;
  isActive?: boolean;
}
