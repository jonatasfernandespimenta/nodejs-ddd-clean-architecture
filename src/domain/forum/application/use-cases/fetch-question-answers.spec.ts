import { describe, it, expect } from 'vitest'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryAnswersRepository.create(makeAnswer({
      questionId: new UniqueEntityID('question-1')
    }))

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question asnwers', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }))
    }

    const result = await sut.execute({
      page: 2,
      questionId: 'question-1'
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})

