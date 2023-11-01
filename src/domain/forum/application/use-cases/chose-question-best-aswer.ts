import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowerdError } from './errors/not-allowed-error'

interface ChoseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type ChoseQuestionBestAnswerUseCaseResponse = Either <ResourceNotFoundError | NotAllowerdError, {
  question: Question
}>

export class ChoseQuestionBestAnswerUseCase {
  constructor(private answersRepository: AnswersRepository, private questionsRepository: QuestionRepository) {}

  async execute({
    authorId,
    answerId
  }: ChoseQuestionBestAnswerUseCaseRequest): Promise<ChoseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if(!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    if(authorId !== question.authorId.toString()) {
      return left(new NotAllowerdError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
