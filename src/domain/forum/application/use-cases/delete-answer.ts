import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not Allowed')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
