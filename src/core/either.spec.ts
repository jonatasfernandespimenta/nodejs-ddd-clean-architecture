import { Either, left, right } from "./either"

function doSomething(x: boolean): Either<string, string> {
  if(x) {
    return right('success')
  } else {
    return left('error')
  }
}

test('success result', () => {
  const successResult = doSomething(true)

  expect(successResult.isRight()).toBeTruthy()
})

test('error result', () => {
  const errorResult = doSomething(false)

  expect(errorResult.isLeft()).toBeTruthy()
})
