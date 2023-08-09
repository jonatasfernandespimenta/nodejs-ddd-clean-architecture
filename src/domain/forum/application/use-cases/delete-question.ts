import { QuestionRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not Allowed')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
