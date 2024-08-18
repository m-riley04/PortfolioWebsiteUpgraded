export default interface CommandModel {
    commandId: number;
    command: string;
    response: string;
    responseJson: string | undefined;
}