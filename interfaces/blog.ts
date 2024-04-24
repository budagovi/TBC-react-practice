export default interface blog {
  id: number,
  title: string,
  body: string,
  userId: number,
  tags: Array<string>,
  reactions: number
}