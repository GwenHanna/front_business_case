import { UserInterface } from './userInterface';

export interface CommentInterface {
  id?: number;
  content: string;
  dateCreated: Date;
  author: UserInterface;
  score: number;
}
