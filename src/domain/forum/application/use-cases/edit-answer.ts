import { Either, left, right } from "@/core/either"
import { AnswersRepository } from "../repositories/answers-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowerdError } from "./errors/not-allowed-error"


interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type EditAnswerUseCaseResponse = Either<ResourceNotFoundError, NotAllowerdError | {}>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    content,
    answerId
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowerdError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return right({})
  }
}
