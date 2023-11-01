import { Either, left, right } from '@/core/either'
import { QuestionRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowerdError } from './errors/not-allowed-error'

interface EditQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type EditQuestionUseCaseResponse = Either<ResourceNotFoundError, NotAllowerdError | {}>

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    questionId
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowerdError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({})
  }
}
