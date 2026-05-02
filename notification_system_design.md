# Notification System Design Architecture
**Name:** T.Vaishnavi
**Register No:** RA2311003020232
**Email:** tv6816@srmist.edu.in
**Phone:** 6305932106
**GitHub:** [https://github.com/ThallemVaishnavi](https://github.com/ThallemVaishnavi)

## Stage 1: Priority Inbox Algorithm

### Approach
The requirement is to display the top 'n' most important notifications based on a combination of weight and recency. 

1. **Weight Assignment:** We first categorize notifications and assign numeric weights:
   - Placement = 3 (Highest Priority)
   - Result = 2 (Medium Priority)
   - Event = 1 (Lowest Priority)
2. **Sorting Logic:** 
   - We use JavaScript's native `.sort()` method.
   - We first compare the numeric weights of two notifications. The one with the higher weight is placed first.
   - If the weights are identical (e.g., two "Placement" notifications), we fallback to chronological sorting. We parse the `Timestamp` strings into Unix epoch times using `new Date().getTime()` and sort them in descending order (newer notifications appear first).
3. **Extraction:** After the entire array is sorted according to the above rules, we slice the array from index `0` to `n` to efficiently extract only the requested number of top notifications.
4. **Logging Integration:** The `logging_middleware` is tightly integrated. We log events when the sorting algorithm starts and completes, as well as API fetch successes and failures.

### Frontend Integration
Even though a full UI is not required for Stage 1, a basic React component was created to securely accept the Authorization token, trigger the API fetch, run the sorting algorithm, and render the JSON data to the screen. This allows for clear, verifiable output screenshots.
