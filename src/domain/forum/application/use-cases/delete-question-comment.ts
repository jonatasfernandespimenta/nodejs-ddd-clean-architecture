import { Either, left, right } from "@/core/either"
import { QuestionCommentsRepository } from "../repositories/question-comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowerdError } from "./errors/not-allowed-error"

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowerdError, {}>

export class DeleteQuestionCommentUseCase {
  constructor(private questioncommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment = await this.questioncommentsRepository.findById(questionCommentId)

    if (!questioncomment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== questioncomment.authorId.toString()) {
      return left(new NotAllowerdError())
    }

    await this.questioncommentsRepository.delete(questioncomment)

    return right({})
  }
}
