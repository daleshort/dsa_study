def bubbleSort(l):

    # initalize an all good flag to false

    # go through the list and compare the number with its neighbor.  if the left is greater than the right, flip them and set the flag.

    all_good = False

    while(all_good == False):

        all_good = True

        for i in range(len(l)-1):

            left = l[i]

            right = l[i+1]

            if(right < left):

                print('flipping')

                l[i] = right

                l[i+1] = left

                all_good = False

            print(i)

    return l


my_list = [1, 4, 2, 5, 8, 9, 0]

print(bubbleSort(my_list))
