export declare class AlertRepositoryMock {
    findAllByDate(dateStart: string, dateEnd: string): Promise<{
        date: string;
        event: string;
        damage: number;
    }[]>;
}
