export const problems = [
  // ─── 배열 ───
  {
    id: 1,
    title: '두 수의 합',
    difficulty: 'easy',
    category: 'array',
    tags: ['배열', '해시맵'],
    description: `정수 배열 nums와 정수 target이 주어졌을 때, 합이 target이 되는 두 수의 인덱스를 반환하세요.

각 입력에 정확히 하나의 답이 존재하며, 같은 요소를 두 번 사용할 수 없습니다.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '유효한 답이 하나만 존재합니다.'],
    hint: '해시맵을 사용하면 O(n)으로 풀 수 있습니다. target - nums[i]가 이미 맵에 있는지 확인해보세요.',
    solution: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i`,
    },
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
      { input: '[3,3]\n6', expectedOutput: '[0,1]' },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def two_sum(nums, target):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const nums = JSON.parse(lines[0]);
  const target = parseInt(lines[1]);
  console.log(JSON.stringify(twoSum(nums, target)));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const nums = JSON.parse(lines[0]);
  const target = parseInt(lines[1]);
  console.log(JSON.stringify(twoSum(nums, target)));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
nums = eval(lines[0])
target = int(lines[1])
print(list(two_sum(nums, target)))`,
    },
  },
  {
    id: 2,
    title: '최대 부분 배열',
    difficulty: 'medium',
    category: 'array',
    tags: ['배열', '동적 프로그래밍'],
    description: `정수 배열 nums가 주어졌을 때, 합이 가장 큰 연속 부분 배열을 찾고 그 합을 반환하세요.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1]의 합이 6으로 가장 큽니다.' },
      { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: '[5,4,-1,7,8] 전체의 합이 23입니다.' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    hint: '카데인 알고리즘(Kadane\'s Algorithm)을 생각해보세요. 현재까지의 최대 부분합을 유지하면서 전체 최대값을 갱신해보세요.',
    solution: {
      javascript: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      typescript: `function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      python: `def max_sub_array(nums):
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: '[1]', expectedOutput: '1' },
      { input: '[5,4,-1,7,8]', expectedOutput: '23' },
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function maxSubArray(nums: number[]): number {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def max_sub_array(nums):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(maxSubArray(JSON.parse(lines[0])));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(maxSubArray(JSON.parse(lines[0])));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(max_sub_array(eval(lines[0])))`,
    },
  },
  {
    id: 3,
    title: '배열에서 중복 찾기',
    difficulty: 'easy',
    category: 'array',
    tags: ['배열', '해시셋'],
    description: `정수 배열 nums가 주어졌을 때, 배열에 중복된 값이 있으면 true, 없으면 false를 반환하세요.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true', explanation: '1이 두 번 나타납니다.' },
      { input: 'nums = [1,2,3,4]', output: 'false', explanation: '모든 값이 유일합니다.' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    hint: 'Set을 활용하면 O(n)으로 풀 수 있습니다.',
    solution: {
      javascript: `function containsDuplicate(nums) {
  const set = new Set();
  for (const num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
}`,
      typescript: `function containsDuplicate(nums: number[]): boolean {
  const set = new Set<number>();
  for (const num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
}`,
      python: `def contains_duplicate(nums):
    return len(nums) != len(set(nums))`,
    },
    testCases: [
      { input: '[1,2,3,1]', expectedOutput: 'true' },
      { input: '[1,2,3,4]', expectedOutput: 'false' },
      { input: '[1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true' },
    ],
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function containsDuplicate(nums: number[]): boolean {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def contains_duplicate(nums):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(containsDuplicate(JSON.parse(lines[0])));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(containsDuplicate(JSON.parse(lines[0])));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(str(contains_duplicate(eval(lines[0]))).lower())`,
    },
  },
  {
    id: 4,
    title: '배열 회전',
    difficulty: 'medium',
    category: 'array',
    tags: ['배열', '수학'],
    description: `정수 배열 nums를 오른쪽으로 k번 회전시키세요.

예를 들어 [1,2,3,4,5,6,7]을 k=3만큼 오른쪽으로 회전하면 [5,6,7,1,2,3,4]가 됩니다.`,
    examples: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', explanation: '오른쪽으로 3번 회전합니다.' },
      { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]', explanation: '오른쪽으로 2번 회전합니다.' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1', '0 <= k <= 10^5'],
    hint: '배열 전체를 뒤집고, 앞 k개, 나머지를 각각 뒤집어보세요. k는 nums.length로 나머지 연산을 해야 합니다.',
    solution: {
      javascript: `function rotate(nums, k) {
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  return nums;
}

function reverse(nums, left, right) {
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}`,
      typescript: `function rotate(nums: number[], k: number): number[] {
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  return nums;
}

function reverse(nums: number[], left: number, right: number): void {
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}`,
      python: `def rotate(nums, k):
    k = k % len(nums)
    nums[:] = nums[-k:] + nums[:-k]
    return nums`,
    },
    testCases: [
      { input: '[1,2,3,4,5,6,7]\n3', expectedOutput: '[5,6,7,1,2,3,4]' },
      { input: '[-1,-100,3,99]\n2', expectedOutput: '[3,99,-1,-100]' },
    ],
    starterCode: {
      javascript: `function rotate(nums, k) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function rotate(nums: number[], k: number): number[] {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def rotate(nums, k):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const nums = JSON.parse(lines[0]);
  const k = parseInt(lines[1]);
  console.log(JSON.stringify(rotate(nums, k)));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const nums = JSON.parse(lines[0]);
  const k = parseInt(lines[1]);
  console.log(JSON.stringify(rotate(nums, k)));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
nums = eval(lines[0])
k = int(lines[1])
print(list(rotate(nums, k)))`,
    },
  },

  // ─── 문자열 ───
  {
    id: 5,
    title: '회문 확인',
    difficulty: 'easy',
    category: 'string',
    tags: ['문자열', '두 포인터'],
    description: `문자열 s가 주어졌을 때, 영문자와 숫자만 고려하고 대소문자를 무시했을 때 팰린드롬인지 판단하세요.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama"는 팰린드롬입니다.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar"는 팰린드롬이 아닙니다.' },
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 's는 ASCII 문자로만 구성됩니다.'],
    hint: '두 포인터를 활용해보세요. 영문자/숫자가 아닌 문자는 건너뛰며 비교해보세요.',
    solution: {
      javascript: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
    while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}`,
      typescript: `function isPalindrome(s: string): boolean {
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
    while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}`,
      python: `def is_palindrome(s):
    filtered = [c.lower() for c in s if c.isalnum()]
    return filtered == filtered[::-1]`,
    },
    testCases: [
      { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true' },
      { input: 'race a car', expectedOutput: 'false' },
      { input: ' ', expectedOutput: 'true' },
    ],
    starterCode: {
      javascript: `function isPalindrome(s) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function isPalindrome(s: string): boolean {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def is_palindrome(s):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(isPalindrome(lines[0]));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(isPalindrome(lines[0]));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(str(is_palindrome(lines[0])).lower())`,
    },
  },
  {
    id: 6,
    title: '애너그램 확인',
    difficulty: 'easy',
    category: 'string',
    tags: ['문자열', '해시맵', '정렬'],
    description: `두 문자열 s와 t가 주어졌을 때, t가 s의 애너그램인지 판단하세요.

애너그램이란 두 문자열이 동일한 문자를 동일한 횟수만큼 포함하는 경우입니다.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: '같은 문자를 같은 횟수만큼 포함합니다.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: '포함하는 문자가 다릅니다.' },
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's와 t는 소문자 알파벳으로만 구성됩니다.'],
    hint: '각 문자의 빈도를 카운트해보세요. 정렬을 이용하는 방법도 있습니다.',
    solution: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const char of s) count[char] = (count[char] || 0) + 1;
  for (const char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,
      typescript: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count: Record<string, number> = {};
  for (const char of s) count[char] = (count[char] || 0) + 1;
  for (const char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,
      python: `def is_anagram(s, t):
    from collections import Counter
    return Counter(s) == Counter(t)`,
    },
    testCases: [
      { input: 'anagram\nnagaram', expectedOutput: 'true' },
      { input: 'rat\ncar', expectedOutput: 'false' },
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function isAnagram(s: string, t: string): boolean {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def is_anagram(s, t):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(isAnagram(lines[0], lines[1]));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(isAnagram(lines[0], lines[1]));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(str(is_anagram(lines[0], lines[1])).lower())`,
    },
  },
  {
    id: 7,
    title: '가장 긴 공통 접두사',
    difficulty: 'easy',
    category: 'string',
    tags: ['문자열'],
    description: `문자열 배열 strs에서 가장 긴 공통 접두사를 찾아 반환하세요.

공통 접두사가 없으면 빈 문자열 ""을 반환하세요.`,
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: '"fl"이 공통 접두사입니다.' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: '공통 접두사가 없습니다.' },
    ],
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i]는 소문자 알파벳으로만 구성됩니다.'],
    hint: '첫 번째 문자열을 기준으로 한 글자씩 비교해보세요.',
    solution: {
      javascript: `function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}`,
      typescript: `function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}`,
      python: `def longest_common_prefix(strs):
    if not strs:
        return ''
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ''
    return prefix`,
    },
    testCases: [
      { input: '["flower","flow","flight"]', expectedOutput: 'fl' },
      { input: '["dog","racecar","car"]', expectedOutput: '' },
    ],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function longestCommonPrefix(strs: string[]): string {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def longest_common_prefix(strs):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const strs = JSON.parse(lines[0]);
  console.log(longestCommonPrefix(strs));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const strs = JSON.parse(lines[0]);
  console.log(longestCommonPrefix(strs));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
strs = eval(lines[0])
print(longest_common_prefix(strs))`,
    },
  },
  {
    id: 8,
    title: '문자열 뒤집기',
    difficulty: 'easy',
    category: 'string',
    tags: ['문자열', '두 포인터'],
    description: `문자 배열 s가 주어졌을 때, 배열을 제자리에서 뒤집으세요.

O(1) 추가 공간만 사용해야 합니다.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: '배열을 뒤집습니다.' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: '배열을 뒤집습니다.' },
    ],
    constraints: ['1 <= s.length <= 10^5', 's[i]는 ASCII 문자입니다.'],
    hint: '두 포인터를 사용해 양쪽 끝에서 시작해 교환하며 가운데로 이동해보세요.',
    solution: {
      javascript: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}`,
      typescript: `function reverseString(s: string[]): string[] {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}`,
      python: `def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s`,
    },
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' },
    ],
    starterCode: {
      javascript: `function reverseString(s) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function reverseString(s: string[]): string[] {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def reverse_string(s):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const s = JSON.parse(lines[0]);
  console.log(JSON.stringify(reverseString(s)));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const s = JSON.parse(lines[0]);
  console.log(JSON.stringify(reverseString(s)));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
s = eval(lines[0])
print(list(reverse_string(s)))`,
    },
  },

  // ─── 스택/큐 ───
  {
    id: 9,
    title: '유효한 괄호',
    difficulty: 'easy',
    category: 'stack',
    tags: ['스택', '문자열'],
    description: `'(', ')', '{', '}', '[', ']' 로만 이루어진 문자열 s가 주어졌을 때, 유효한지 판단하세요.

- 열린 괄호는 같은 종류의 닫힌 괄호로 닫혀야 합니다.
- 열린 괄호는 올바른 순서로 닫혀야 합니다.`,
    examples: [
      { input: 's = "()"', output: 'true', explanation: '올바르게 짝이 맞습니다.' },
      { input: 's = "()[]{}"', output: 'true', explanation: '모든 괄호가 올바르게 닫혀 있습니다.' },
      { input: 's = "(]"', output: 'false', explanation: '괄호의 종류가 맞지 않습니다.' },
    ],
    constraints: ['1 <= s.length <= 10^4'],
    hint: '스택을 활용해보세요. 열린 괄호는 push, 닫힌 괄호는 top과 비교해보세요.',
    solution: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if ('({['.includes(char)) stack.push(char);
    else if (stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
      typescript: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if ('({['.includes(char)) stack.push(char);
    else if (stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in '({[':
            stack.append(char)
        else:
            if not stack or stack.pop() != mapping[char]:
                return False
    return len(stack) == 0`,
    },
    testCases: [
      { input: '()', expectedOutput: 'true' },
      { input: '()[]{}', expectedOutput: 'true' },
      { input: '(]', expectedOutput: 'false' },
    ],
    starterCode: {
      javascript: `function isValid(s) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function isValid(s: string): boolean {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def is_valid(s):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(isValid(lines[0]));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(isValid(lines[0]));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(str(is_valid(lines[0])).lower())`,
    },
  },
  {
    id: 10,
    title: '주식 사고팔기',
    difficulty: 'easy',
    category: 'stack',
    tags: ['스택', '탐욕법', '배열'],
    description: `주식 가격 배열 prices가 주어졌을 때, 한 번의 거래로 얻을 수 있는 최대 이익을 반환하세요.

이익을 얻을 수 없는 경우 0을 반환하세요.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: '1에 사서 6에 팔면 이익이 5입니다.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: '이익을 얻을 수 없습니다.' },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    hint: '최솟값을 추적하면서 현재 가격과의 차이를 계산해보세요.',
    solution: {
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
      typescript: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
      python: `def max_profit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit`,
    },
    testCases: [
      { input: '[7,1,5,3,6,4]', expectedOutput: '5' },
      { input: '[7,6,4,3,1]', expectedOutput: '0' },
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function maxProfit(prices: number[]): number {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def max_profit(prices):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(maxProfit(JSON.parse(lines[0])));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(maxProfit(JSON.parse(lines[0])));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(max_profit(eval(lines[0])))`,
    },
  },
  {
    id: 11,
    title: '올바른 괄호 문자열 최소 추가',
    difficulty: 'medium',
    category: 'stack',
    tags: ['스택', '탐욕법', '문자열'],
    description: `'(' 와 ')' 로만 이루어진 문자열 s가 주어졌을 때, 유효한 괄호 문자열을 만들기 위해 최소한으로 추가해야 하는 괄호의 수를 반환하세요.`,
    examples: [
      { input: 's = "())"', output: '1', explanation: '"(" 를 하나 추가하면 됩니다.' },
      { input: 's = "((("', output: '3', explanation: '")" 를 3개 추가해야 합니다.' },
    ],
    constraints: ['1 <= s.length <= 1000', 's는 \'(\' 와 \')\' 로만 구성됩니다.'],
    hint: '열린 괄호 수를 추적하면서 닫힌 괄호가 나왔을 때 처리해보세요.',
    solution: {
      javascript: `function minAddToMakeValid(s) {
  let open = 0, close = 0;
  for (const char of s) {
    if (char === '(') {
      open++;
    } else {
      if (open > 0) open--;
      else close++;
    }
  }
  return open + close;
}`,
      typescript: `function minAddToMakeValid(s: string): number {
  let open = 0, close = 0;
  for (const char of s) {
    if (char === '(') {
      open++;
    } else {
      if (open > 0) open--;
      else close++;
    }
  }
  return open + close;
}`,
      python: `def min_add_to_make_valid(s):
    open_count = close_count = 0
    for char in s:
        if char == '(':
            open_count += 1
        else:
            if open_count > 0:
                open_count -= 1
            else:
                close_count += 1
    return open_count + close_count`,
    },
    testCases: [
      { input: '())', expectedOutput: '1' },
      { input: '(((', expectedOutput: '3' },
      { input: '()', expectedOutput: '0' },
    ],
    starterCode: {
      javascript: `function minAddToMakeValid(s) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function minAddToMakeValid(s: string): number {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def min_add_to_make_valid(s):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(minAddToMakeValid(lines[0]));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(minAddToMakeValid(lines[0]));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(min_add_to_make_valid(lines[0]))`,
    },
  },

  // ─── 동적 프로그래밍 ───
  {
    id: 12,
    title: '피보나치 수열',
    difficulty: 'easy',
    category: 'dp',
    tags: ['동적 프로그래밍', '재귀'],
    description: `n번째 피보나치 수를 반환하세요.

- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) (n > 1)`,
    examples: [
      { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3' },
      { input: 'n = 10', output: '55', explanation: '10번째 피보나치 수는 55입니다.' },
    ],
    constraints: ['0 <= n <= 30'],
    hint: '단순 재귀는 중복 계산이 많습니다. 메모이제이션이나 바텀업 DP를 사용해 O(n)으로 최적화해보세요.',
    solution: {
      javascript: `function fib(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
      typescript: `function fib(n: number): number {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
      python: `def fib(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr`,
    },
    testCases: [
      { input: '4', expectedOutput: '3' },
      { input: '10', expectedOutput: '55' },
      { input: '0', expectedOutput: '0' },
    ],
    starterCode: {
      javascript: `function fib(n) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function fib(n: number): number {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def fib(n):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(fib(parseInt(lines[0])));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(fib(parseInt(lines[0])));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(fib(int(lines[0])))`,
    },
  },
  {
    id: 13,
    title: '계단 오르기',
    difficulty: 'easy',
    category: 'dp',
    tags: ['동적 프로그래밍'],
    description: `n개의 계단을 오르는 방법의 수를 반환하세요.

한 번에 1개 또는 2개의 계단을 오를 수 있습니다.`,
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 또는 2, 두 가지 방법이 있습니다.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1, 세 가지 방법이 있습니다.' },
    ],
    constraints: ['1 <= n <= 45'],
    hint: 'n번째 계단에 오르는 방법은 n-1번째에서 1칸, n-2번째에서 2칸 오르는 경우의 합입니다. 피보나치와 같은 패턴입니다.',
    solution: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
      typescript: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
      python: `def climb_stairs(n):
    if n <= 2:
        return n
    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    return curr`,
    },
    testCases: [
      { input: '2', expectedOutput: '2' },
      { input: '3', expectedOutput: '3' },
      { input: '5', expectedOutput: '8' },
    ],
    starterCode: {
      javascript: `function climbStairs(n) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function climbStairs(n: number): number {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def climb_stairs(n):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(climbStairs(parseInt(lines[0])));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(climbStairs(parseInt(lines[0])));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(climb_stairs(int(lines[0])))`,
    },
  },
  {
    id: 14,
    title: '동전 교환',
    difficulty: 'medium',
    category: 'dp',
    tags: ['동적 프로그래밍', '탐욕법'],
    description: `동전의 종류를 나타내는 배열 coins와 총액 amount가 주어졌을 때, amount를 만들기 위한 최소 동전 수를 반환하세요.

만들 수 없는 경우 -1을 반환하세요.`,
    examples: [
      { input: 'coins = [1,5,11], amount = 11', output: '1', explanation: '11짜리 동전 1개면 됩니다.' },
      { input: 'coins = [2], amount = 3', output: '-1', explanation: '만들 수 없습니다.' },
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    hint: 'dp[i] = i원을 만들기 위한 최소 동전 수로 정의하고 바텀업으로 풀어보세요.',
    solution: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      typescript: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return -1 if dp[amount] == float('inf') else dp[amount]`,
    },
    testCases: [
      { input: '[1,5,11]\n11', expectedOutput: '1' },
      { input: '[2]\n3', expectedOutput: '-1' },
      { input: '[1,2,5]\n11', expectedOutput: '3' },
    ],
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function coinChange(coins: number[], amount: number): number {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def coin_change(coins, amount):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const coins = JSON.parse(lines[0]);
  const amount = parseInt(lines[1]);
  console.log(coinChange(coins, amount));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const coins = JSON.parse(lines[0]);
  const amount = parseInt(lines[1]);
  console.log(coinChange(coins, amount));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
coins = eval(lines[0])
amount = int(lines[1])
print(coin_change(coins, amount))`,
    },
  },
  {
    id: 15,
    title: '집 도둑질',
    difficulty: 'medium',
    category: 'dp',
    tags: ['동적 프로그래밍', '배열'],
    description: `각 집에 있는 돈의 양을 나타내는 배열 nums가 주어졌을 때, 인접한 집을 연속으로 털지 않으면서 훔칠 수 있는 최대 금액을 반환하세요.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: '1번집(1)과 3번집(3)을 털면 4입니다.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: '1번(2), 3번(9), 5번(1)을 털면 12입니다.' },
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    hint: 'dp[i] = i번째 집까지 털 수 있는 최대 금액으로 정의하고, dp[i] = max(dp[i-1], dp[i-2] + nums[i])로 점화식을 세워보세요.',
    solution: {
      javascript: `function rob(nums) {
  if (nums.length === 1) return nums[0];
  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
      typescript: `function rob(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
      python: `def rob(nums):
    if len(nums) == 1:
        return nums[0]
    prev2 = prev1 = 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2, prev1 = prev1, curr
    return prev1`,
    },
    testCases: [
      { input: '[1,2,3,1]', expectedOutput: '4' },
      { input: '[2,7,9,3,1]', expectedOutput: '12' },
    ],
    starterCode: {
      javascript: `function rob(nums) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function rob(nums: number[]): number {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def rob(nums):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(rob(JSON.parse(lines[0])));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(rob(JSON.parse(lines[0])));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(rob(eval(lines[0])))`,
    },
  },

  // ─── 트리 ───
  {
    id: 16,
    title: '이진 트리 최대 깊이',
    difficulty: 'easy',
    category: 'tree',
    tags: ['트리', 'DFS', 'BFS'],
    description: `이진 트리의 루트 노드가 주어졌을 때, 트리의 최대 깊이를 반환하세요.

최대 깊이는 루트 노드에서 가장 먼 리프 노드까지의 노드 수입니다.

입력은 레벨 순서 배열로 주어집니다. null은 빈 노드를 의미합니다.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: '최대 깊이는 3입니다.' },
      { input: 'root = [1,null,2]', output: '2', explanation: '최대 깊이는 2입니다.' },
    ],
    constraints: ['트리의 노드 수는 0 ~ 10^4', '-100 <= Node.val <= 100'],
    hint: '재귀를 사용해 왼쪽과 오른쪽 서브트리의 최대 깊이 중 큰 값에 1을 더해보세요.',
    solution: {
      javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// 트리 빌더 (테스트용)
function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) {
      node.left = { val: arr[i], left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = { val: arr[i], left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  return root;
}`,
      typescript: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function buildTree(arr: (number | null)[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;
  const root: TreeNode = { val: arr[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift()!;
    if (arr[i] !== null) {
      node.left = { val: arr[i] as number, left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = { val: arr[i] as number, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  return root;
}`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

def build_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root`,
    },
    testCases: [
      { input: '[3,9,20,null,null,15,7]', expectedOutput: '3' },
      { input: '[1,null,2]', expectedOutput: '2' },
      { input: '[]', expectedOutput: '0' },
    ],
    starterCode: {
      javascript: `function maxDepth(root) {
  // 여기에 코드를 작성하세요
  
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) { node.left = { val: arr[i], left: null, right: null }; queue.push(node.left); }
    i++;
    if (i < arr.length && arr[i] !== null) { node.right = { val: arr[i], left: null, right: null }; queue.push(node.right); }
    i++;
  }
  return root;
}`,
      typescript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }

function maxDepth(root: TreeNode | null): number {
  // 여기에 코드를 작성하세요
  
}`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    # 여기에 코드를 작성하세요
    pass

def build_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); queue.append(node.right)
        i += 1
    return root`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const arr = JSON.parse(lines[0]);
  const root = buildTree(arr);
  console.log(maxDepth(root));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const arr = JSON.parse(lines[0]);
  const root = buildTree(arr);
  console.log(maxDepth(root));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
arr = eval(lines[0]) if lines[0] != '[]' else []
root = build_tree(arr) if arr else None
print(max_depth(root))`,
    },
  },
  {
    id: 17,
    title: '이진 트리 반전',
    difficulty: 'easy',
    category: 'tree',
    tags: ['트리', 'DFS', 'BFS'],
    description: `이진 트리의 루트 노드가 주어졌을 때, 트리를 좌우 반전시키고 루트를 반환하세요.

입력은 레벨 순서 배열로 주어집니다.`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: '트리를 좌우 반전합니다.' },
      { input: 'root = [2,1,3]', output: '[2,3,1]', explanation: '트리를 좌우 반전합니다.' },
    ],
    constraints: ['트리의 노드 수는 0 ~ 100', '-100 <= Node.val <= 100'],
    hint: '재귀적으로 왼쪽과 오른쪽 서브트리를 교환해보세요.',
    solution: {
      javascript: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) { node.left = { val: arr[i], left: null, right: null }; queue.push(node.left); }
    i++;
    if (i < arr.length && arr[i] !== null) { node.right = { val: arr[i], left: null, right: null }; queue.push(node.right); }
    i++;
  }
  return root;
}

function treeToArray(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) { result.push(node.val); queue.push(node.left, node.right); }
    else result.push(null);
  }
  while (result[result.length - 1] === null) result.pop();
  return result;
}`,
      typescript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root

def build_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); queue.append(node.right)
        i += 1
    return root

def tree_to_array(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    while result and result[-1] is None:
        result.pop()
    return result`,
    },
    testCases: [
      { input: '[4,2,7,1,3,6,9]', expectedOutput: '[4,7,2,9,6,3,1]' },
      { input: '[2,1,3]', expectedOutput: '[2,3,1]' },
    ],
    starterCode: {
      javascript: `function invertTree(root) {
  // 여기에 코드를 작성하세요
  
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) { node.left = { val: arr[i], left: null, right: null }; queue.push(node.left); }
    i++;
    if (i < arr.length && arr[i] !== null) { node.right = { val: arr[i], left: null, right: null }; queue.push(node.right); }
    i++;
  }
  return root;
}

function treeToArray(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) { result.push(node.val); queue.push(node.left, node.right); }
    else result.push(null);
  }
  while (result[result.length - 1] === null) result.pop();
  return result;
}`,
      typescript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }

function invertTree(root: TreeNode | null): TreeNode | null {
  // 여기에 코드를 작성하세요
  
}`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    # 여기에 코드를 작성하세요
    pass

def build_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); queue.append(node.right)
        i += 1
    return root

def tree_to_array(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    while result and result[-1] is None:
        result.pop()
    return result`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const arr = JSON.parse(lines[0]);
  const root = buildTree(arr);
  console.log(JSON.stringify(treeToArray(invertTree(root))));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const arr = JSON.parse(lines[0]);
  const root = buildTree(arr);
  console.log(JSON.stringify(treeToArray(invertTree(root))));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
arr = eval(lines[0])
root = build_tree(arr)
result = invert_tree(root)
print(list(tree_to_array(result)))`,
    },
  },
  {
    id: 18,
    title: '이진 탐색 트리 유효성 검사',
    difficulty: 'medium',
    category: 'tree',
    tags: ['트리', 'DFS', 'BST'],
    description: `이진 트리의 루트 노드가 주어졌을 때, 유효한 이진 탐색 트리(BST)인지 판단하세요.

BST의 조건:
- 왼쪽 서브트리의 모든 노드값은 루트보다 작아야 합니다.
- 오른쪽 서브트리의 모든 노드값은 루트보다 커야 합니다.
- 왼쪽, 오른쪽 서브트리도 모두 BST여야 합니다.`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true', explanation: '유효한 BST입니다.' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: '루트(5)의 오른쪽에 3이 있어 BST가 아닙니다.' },
    ],
    constraints: ['트리의 노드 수는 1 ~ 10^4', '-2^31 <= Node.val <= 2^31 - 1'],
    hint: '각 노드가 허용 범위 내에 있는지 재귀적으로 확인해보세요. 단순히 자식과만 비교하면 안 됩니다.',
    solution: {
      javascript: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) { node.left = { val: arr[i], left: null, right: null }; queue.push(node.left); }
    i++;
    if (i < arr.length && arr[i] !== null) { node.right = { val: arr[i], left: null, right: null }; queue.push(node.right); }
    i++;
  }
  return root;
}`,
      typescript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }

function isValidBST(root: TreeNode | null, min = -Infinity, max = Infinity): boolean {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    if root.val <= min_val or root.val >= max_val:
        return False
    return is_valid_bst(root.left, min_val, root.val) and is_valid_bst(root.right, root.val, max_val)

def build_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); queue.append(node.right)
        i += 1
    return root`,
    },
    testCases: [
      { input: '[2,1,3]', expectedOutput: 'true' },
      { input: '[5,1,4,null,null,3,6]', expectedOutput: 'false' },
    ],
    starterCode: {
      javascript: `function isValidBST(root) {
  // 여기에 코드를 작성하세요
  
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) { node.left = { val: arr[i], left: null, right: null }; queue.push(node.left); }
    i++;
    if (i < arr.length && arr[i] !== null) { node.right = { val: arr[i], left: null, right: null }; queue.push(node.right); }
    i++;
  }
  return root;
}`,
      typescript: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }

function isValidBST(root: TreeNode | null): boolean {
  // 여기에 코드를 작성하세요
  
}`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root):
    # 여기에 코드를 작성하세요
    pass

def build_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); queue.append(node.right)
        i += 1
    return root`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const arr = JSON.parse(lines[0]);
  const root = buildTree(arr);
  console.log(isValidBST(root));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const arr = JSON.parse(lines[0]);
  const root = buildTree(arr);
  console.log(isValidBST(root));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
arr = eval(lines[0])
root = build_tree(arr)
print(str(is_valid_bst(root)).lower())`,
    },
  },

  // ─── 그래프 ───
  {
    id: 19,
    title: '섬의 개수',
    difficulty: 'medium',
    category: 'graph',
    tags: ['그래프', 'DFS', 'BFS'],
    description: `'1'(육지)과 '0'(물)으로 이루어진 2D 배열 grid가 주어졌을 때, 섬의 개수를 반환하세요.

섬은 물로 둘러싸여 있으며, 수평 또는 수직으로 인접한 육지를 연결해 만들어집니다.`,
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1',
        explanation: '연결된 육지가 하나의 섬을 이룹니다.',
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3',
        explanation: '세 개의 섬이 있습니다.',
      },
    ],
    constraints: ['1 <= grid.length, grid[i].length <= 300', 'grid[i][j]는 \'0\' 또는 \'1\'입니다.'],
    hint: 'DFS로 육지를 발견하면 연결된 모든 육지를 방문 처리하고 카운트를 증가시켜보세요.',
    solution: {
      javascript: `function numIslands(grid) {
  let count = 0;
  function dfs(i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;
    grid[i][j] = '0';
    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') { count++; dfs(i, j); }
    }
  }
  return count;
}`,
      typescript: `function numIslands(grid: string[][]): number {
  let count = 0;
  function dfs(i: number, j: number): void {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;
    grid[i][j] = '0';
    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') { count++; dfs(i, j); }
    }
  }
  return count;
}`,
      python: `def num_islands(grid):
    def dfs(i, j):
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] == '0':
            return
        grid[i][j] = '0'
        dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)
    
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    return count`,
    },
    testCases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: '1' },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: '3' },
    ],
    starterCode: {
      javascript: `function numIslands(grid) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function numIslands(grid: string[][]): number {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def num_islands(grid):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const grid = JSON.parse(lines[0]);
  console.log(numIslands(grid));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const grid = JSON.parse(lines[0]);
  console.log(numIslands(grid));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
grid = eval(lines[0])
print(num_islands(grid))`,
    },
  },
  {
    id: 20,
    title: '코스 일정',
    difficulty: 'medium',
    category: 'graph',
    tags: ['그래프', '위상 정렬', 'DFS'],
    description: `numCourses개의 강의가 있고, prerequisites 배열에 [a, b] 형태로 "b를 듣기 위해 a를 먼저 들어야 한다"는 조건이 주어졌을 때, 모든 강의를 들을 수 있는지 판단하세요.`,
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: '0을 먼저 듣고 1을 들으면 됩니다.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: '순환 의존성이 있어 불가능합니다.' },
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000'],
    hint: '위상 정렬 또는 DFS로 사이클을 감지해보세요. 사이클이 없으면 모든 강의를 들을 수 있습니다.',
    solution: {
      javascript: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const visited = new Array(numCourses).fill(0);
  
  for (const [a, b] of prerequisites) graph[b].push(a);
  
  function hasCycle(node) {
    if (visited[node] === 1) return true;
    if (visited[node] === 2) return false;
    visited[node] = 1;
    for (const next of graph[node]) {
      if (hasCycle(next)) return true;
    }
    visited[node] = 2;
    return false;
  }
  
  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  return true;
}`,
      typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const visited = new Array(numCourses).fill(0);
  
  for (const [a, b] of prerequisites) graph[b].push(a);
  
  function hasCycle(node: number): boolean {
    if (visited[node] === 1) return true;
    if (visited[node] === 2) return false;
    visited[node] = 1;
    for (const next of graph[node]) {
      if (hasCycle(next)) return true;
    }
    visited[node] = 2;
    return false;
  }
  
  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  return true;
}`,
      python: `def can_finish(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    visited = [0] * num_courses
    
    for a, b in prerequisites:
        graph[b].append(a)
    
    def has_cycle(node):
        if visited[node] == 1:
            return True
        if visited[node] == 2:
            return False
        visited[node] = 1
        for next_node in graph[node]:
            if has_cycle(next_node):
                return True
        visited[node] = 2
        return False
    
    return not any(has_cycle(i) for i in range(num_courses))`,
    },
    testCases: [
      { input: '2\n[[1,0]]', expectedOutput: 'true' },
      { input: '2\n[[1,0],[0,1]]', expectedOutput: 'false' },
    ],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {\n  // 여기에 코드를 작성하세요\n  \n}`,
      typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {\n  // 여기에 코드를 작성하세요\n  \n}`,
      python: `def can_finish(num_courses, prerequisites):\n    # 여기에 코드를 작성하세요\n    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const numCourses = parseInt(lines[0]);
  const prerequisites = JSON.parse(lines[1]);
  console.log(canFinish(numCourses, prerequisites));
});`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const numCourses = parseInt(lines[0]);
  const prerequisites = JSON.parse(lines[1]);
  console.log(canFinish(numCourses, prerequisites));
});`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
num_courses = int(lines[0])
prerequisites = eval(lines[1])
print(str(can_finish(num_courses, prerequisites)).lower())`,
    },
  },
]

export const categories = [
  { id: 'all', label: '전체' },
  { id: 'array', label: '배열' },
  { id: 'string', label: '문자열' },
  { id: 'stack', label: '스택/큐' },
  { id: 'dp', label: '동적 프로그래밍' },
  { id: 'tree', label: '트리' },
  { id: 'graph', label: '그래프' },
]