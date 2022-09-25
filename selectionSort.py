class Solution:

    def sortArray(self, nums: List[int]) -> List[int]:

        def selectionSort(nums):

            def getMinIndex(l):

                min_val = l[0]

                min_index = 0

                for i in range(len(l)):

                    if l[i] < min_val:

                        min_val = l[i]

                        min_index = i

                return min_index

            answer = []

            for i in range(len(nums)):

                pop_index = getMinIndex(nums)

                answer.append(nums.pop(pop_index))

            return answer

        return selectionSort(nums)
