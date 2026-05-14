export const problems = [
  {
    id: 1,
    title: '두 수의 합',
    difficulty: 'easy',
    category: 'array',
    tags: ['배열', '해시맵'],
    description: `정수 배열 nums와 정수 target이 주어졌을 때, 합이 target이 되는 두 수의 인덱스를 반환하세요.

각 입력에 정확히 하나의 답이 존재하며, 같은 요소를 두 번 사용할 수 없습니다.
답은 어떤 순서로 반환해도 됩니다.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9이므로 [0, 1]을 반환합니다.',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6이므로 [1, 2]를 반환합니다.',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      '유효한 답이 하나만 존재합니다.',
    ],
    hint: '해시맵을 사용하면 O(n) 시간 복잡도로 풀 수 있습니다. 각 원소를 순회하면서 target - nums[i]가 이미 해시맵에 있는지 확인해보세요.',
    solution: {
      javascript: `// O(n) 풀이 - 해시맵 활용
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
}`,
      typescript: `// O(n) 풀이 - 해시맵 활용
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `# O(n) 풀이 - 딕셔너리 활용
def two_sum(nums, target):
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
      javascript: `function twoSum(nums, target) {
  // 여기에 코드를 작성하세요
  
}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // 여기에 코드를 작성하세요
  
}`,
      python: `def two_sum(nums, target):
    # 여기에 코드를 작성하세요
    pass`,
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
});
`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const nums = JSON.parse(lines[0]);
  const target = parseInt(lines[1]);
  console.log(JSON.stringify(twoSum(nums, target)));
});
`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
nums = eval(lines[0])
target = int(lines[1])
print(list(two_sum(nums, target)))
`,
    },
  },
  {
    id: 2,
    title: '유효한 괄호',
    difficulty: 'easy',
    category: 'stack',
    tags: ['스택', '문자열'],
    description: `'(', ')', '{', '}', '[', ']' 로만 이루어진 문자열 s가 주어졌을 때, 유효한지 판단하세요.

다음 규칙을 모두 만족하면 유효합니다:
- 열린 괄호는 같은 종류의 닫힌 괄호로 닫혀야 합니다.
- 열린 괄호는 올바른 순서로 닫혀야 합니다.
- 모든 닫힌 괄호에는 대응하는 열린 괄호가 있어야 합니다.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: '올바르게 짝이 맞습니다.',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: '모든 괄호가 올바르게 닫혀 있습니다.',
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: '괄호의 종류가 맞지 않습니다.',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's는 괄호 문자로만 구성됩니다.',
    ],
    hint: '스택을 활용해보세요. 열린 괄호를 만나면 스택에 push하고, 닫힌 괄호를 만나면 스택의 top과 비교해보세요.',
    solution: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for (const char of s) {
    if ('({['.includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  
  return stack.length === 0;
}`,
      typescript: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  
  for (const char of s) {
    if ('({['.includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
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
      { input: '()[]{}\n', expectedOutput: 'true' },
      { input: '(]', expectedOutput: 'false' },
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // 여기에 코드를 작성하세요
  
}`,
      typescript: `function isValid(s: string): boolean {
  // 여기에 코드를 작성하세요
  
}`,
      python: `def is_valid(s):
    # 여기에 코드를 작성하세요
    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(isValid(lines[0]));
});
`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(isValid(lines[0]));
});
`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(str(is_valid(lines[0])).lower())
`,
    },
  },
  {
    id: 3,
    title: '최대 부분 배열',
    difficulty: 'medium',
    category: 'dp',
    tags: ['동적 프로그래밍', '배열'],
    description: `정수 배열 nums가 주어졌을 때, 합이 가장 큰 연속 부분 배열을 찾고 그 합을 반환하세요.

부분 배열은 배열의 연속된 부분입니다.`,
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1]의 합이 6으로 가장 큽니다.',
      },
      {
        input: 'nums = [1]',
        output: '1',
        explanation: '원소가 하나이므로 그 값이 최대 합입니다.',
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23',
        explanation: '[5,4,-1,7,8] 전체의 합이 23으로 가장 큽니다.',
      },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    hint: '카데인 알고리즘(Kadane\'s Algorithm)을 생각해보세요. 현재 원소까지의 최대 부분합을 유지하면서 전체 최대값을 갱신해보세요.',
    solution: {
      javascript: `// 카데인 알고리즘 - O(n)
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`,
      typescript: `// 카데인 알고리즘 - O(n)
function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`,
      python: `# 카데인 알고리즘 - O(n)
def max_sub_array(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    
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
      javascript: `function maxSubArray(nums) {
  // 여기에 코드를 작성하세요
  
}`,
      typescript: `function maxSubArray(nums: number[]): number {
  // 여기에 코드를 작성하세요
  
}`,
      python: `def max_sub_array(nums):
    # 여기에 코드를 작성하세요
    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const nums = JSON.parse(lines[0]);
  console.log(maxSubArray(nums));
});
`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  const nums = JSON.parse(lines[0]);
  console.log(maxSubArray(nums));
});
`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
nums = eval(lines[0])
print(max_sub_array(nums))
`,
    },
  },
  {
    id: 4,
    title: '회문 확인',
    difficulty: 'easy',
    category: 'string',
    tags: ['문자열', '두 포인터'],
    description: `문자열 s가 주어졌을 때, 영문자와 숫자만 고려하고 대소문자를 무시했을 때 팰린드롬(앞뒤가 같은 문자열)인지 판단하세요.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama"는 팰린드롬입니다.',
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar"는 팰린드롬이 아닙니다.',
      },
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's는 ASCII 문자로만 구성됩니다.',
    ],
    hint: '두 포인터를 활용해보세요. 왼쪽과 오른쪽에서 시작해서 영문자/숫자가 아닌 문자는 건너뛰며 비교해보세요.',
    solution: {
      javascript: `function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;
    
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    
    left++;
    right--;
  }
  
  return true;
}

function isAlphaNumeric(char) {
  return /[a-zA-Z0-9]/.test(char);
}`,
      typescript: `function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;
    
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    
    left++;
    right--;
  }
  
  return true;
}

function isAlphaNumeric(char: string): boolean {
  return /[a-zA-Z0-9]/.test(char);
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
      javascript: `function isPalindrome(s) {
  // 여기에 코드를 작성하세요
  
}`,
      typescript: `function isPalindrome(s: string): boolean {
  // 여기에 코드를 작성하세요
  
}`,
      python: `def is_palindrome(s):
    # 여기에 코드를 작성하세요
    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(isPalindrome(lines[0]));
});
`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(isPalindrome(lines[0]));
});
`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(str(is_palindrome(lines[0])).lower())
`,
    },
  },
  {
    id: 5,
    title: '피보나치 수열',
    difficulty: 'easy',
    category: 'dp',
    tags: ['동적 프로그래밍', '재귀'],
    description: `n번째 피보나치 수를 반환하세요.

피보나치 수열은 다음과 같이 정의됩니다:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) (n > 1)`,
    examples: [
      {
        input: 'n = 4',
        output: '3',
        explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3',
      },
      {
        input: 'n = 10',
        output: '55',
        explanation: '10번째 피보나치 수는 55입니다.',
      },
    ],
    constraints: [
      '0 <= n <= 30',
    ],
    hint: '단순 재귀는 중복 계산이 많습니다. 메모이제이션이나 바텀업 DP를 사용해 O(n)으로 최적화해보세요.',
    solution: {
      javascript: `// 바텀업 DP - O(n)
function fib(n) {
  if (n <= 1) return n;
  
  let prev = 0, curr = 1;
  
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  
  return curr;
}`,
      typescript: `// 바텀업 DP - O(n)
function fib(n: number): number {
  if (n <= 1) return n;
  
  let prev = 0, curr = 1;
  
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  
  return curr;
}`,
      python: `# 바텀업 DP - O(n)
def fib(n):
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
      javascript: `function fib(n) {
  // 여기에 코드를 작성하세요
  
}`,
      typescript: `function fib(n: number): number {
  // 여기에 코드를 작성하세요
  
}`,
      python: `def fib(n):
    # 여기에 코드를 작성하세요
    pass`,
    },
    runnerCode: {
      javascript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  console.log(fib(parseInt(lines[0])));
});
`,
      typescript: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
  console.log(fib(parseInt(lines[0])));
});
`,
      python: `
import sys
lines = sys.stdin.read().strip().split('\\n')
print(fib(int(lines[0])))
`,
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