export interface Connection {
  connString: string;
  topic: string;
  sub: string;
  isActive?: boolean;
}

export interface EditSavedConnection {
  oldVersion: Connection;
  newVersion: Connection;
}
