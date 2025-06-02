export default interface Message {
    id?: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}