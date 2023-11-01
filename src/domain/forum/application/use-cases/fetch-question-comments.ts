import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<null, {
  questionComments: QuestionComment[]
}>

export class FetchQuestionCommentsUseCase {
  constructor(private questionsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionsRepository.findManyByQuestionId(questionId, { page })

    return right({ questionComments })
  }
}
