export interface IAttendance {
    primary: boolean;

    secondary: number;

    additional?: string;

    paidByCard?: boolean;
}
