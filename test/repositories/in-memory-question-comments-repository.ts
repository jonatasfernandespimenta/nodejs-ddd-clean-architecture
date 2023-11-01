import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []
  
  async findById(id: string) {
    return this.items.find(item => item.id.toString() === id) ?? null
  }

  async delete(question: QuestionComment) {
    const index = this.items.findIndex(item => item.id === question.id)
    this.items.splice(index, 1)
  }

  async create(question: QuestionComment) {
    this.items.push(question)
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const items = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return items
  }

}
