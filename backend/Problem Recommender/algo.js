function getRecommendedLevels(user, problemCategories, solvedProblems = []) {
    let recommendedLevels = new Map()

    for (let category of problemCategories) {
        let userLevel = getLowestLevel(category)
        let recommendedLevelRatio = 0

        if (solvedProblems.length > 0) {
            let categorySolvedProblems = getSolvedProblemsForCategory(solvedProblems, category)
            let solvedProblemsPerLevel = getSolvedProblemsPerLevel(categorySolvedProblems, category)
            let ratioPerLevel = getRatioPerLevel(solvedProblemsPerLevel, category)
            // console.log(ratioPerLevel)
            for (let level in ratioPerLevel) {
                let levelRatio = ratioPerLevel[level]

                if (levelRatio > recommendedLevelRatio) {
                    userLevel = parseInt(level)
                    recommendedLevelRatio = Math.min(levelRatio, 0.7)
                }

                if (levelRatio > 0.7) {
                    userLevel = parseInt(level) + 1
                    recommendedLevelRatio = Math.min(levelRatio + 1, 0.7)
                    recommendedLevels.set(category.name, userLevel)
                }

                if (recommendedLevelRatio > 0.4 && recommendedLevelRatio < 0.7) {
                    recommendedLevels.set(category.name, userLevel + 1)
                }
            }
        } else {
            recommendedLevels.set(category.name, userLevel)
        }
    }

    return recommendedLevels
}

// Helper functions
function getLowestLevel(category) {
    return Math.min(...category.levels.map(l => l.level))
}

function getSolvedProblemsForCategory(solvedProblems, category) {
    return solvedProblems.filter(problem => problem.category === category.name)
}

function getSolvedProblemsPerLevel(categorySolvedProblems, category) {
    let solvedProblemsPerLevel = {}
    for (let level of category.levels) {
        solvedProblemsPerLevel[level.level] = categorySolvedProblems.filter(p => p.level === level.level).length
    }
    return solvedProblemsPerLevel
}

function getRatioPerLevel(solvedProblemsPerLevel, category) {
    let ratioPerLevel = {}
    for (let level of category.levels) {
        let totalProblemsAtLevel = category.levels.filter(l => l.level === level.level).length
        ratioPerLevel[level.level] = solvedProblemsPerLevel[level.level] / totalProblemsAtLevel
    }
    return ratioPerLevel
}

function getRandomProblems(problems, k) {
    const shuffled = problems.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, k)
}

function makeRecommendations(user, problemCategories, solvedProblems = [], allProblems, k) {
    const recommendedLevels = getRecommendedLevels(user, problemCategories, solvedProblems)
    const recommendations = []

    for (let category of problemCategories) {
        const userRecommendedLevel = recommendedLevels.get(category.name) || getLowestLevel(category)
        
        const unsolvedProblems = allProblems.filter(problem => 
            problem.category === category.name && 
            problem.level === userRecommendedLevel && 
            !solvedProblems.some(solved => solved.problem === problem.problem)
        )

        const randomProblems = getRandomProblems(unsolvedProblems, k)
        recommendations.push(...randomProblems)
    }

    return recommendations
}

const problemCategories = [
    {
        name: 'Greedy',
        levels: [
            { level: 1, problem: 'Greedy Problem 1' },
            { level: 2, problem: 'Greedy Problem 2' },
            { level: 3, problem: 'Greedy Problem 3' }
        ]
    },
    {
        name: 'Dynamic programming',
        levels: [
            { level: 1, problem: 'Dynamic programming Problem 1' },
            { level: 2, problem: 'Dynamic programming Problem 2' },
            { level: 3, problem: 'Dynamic programming Problem 3' }
        ]
    }
]

const allProblems = [
    { category: 'Greedy', level: 1, problem: 'Greedy Problem 1' },
    { category: 'Greedy', level: 2, problem: 'Greedy Problem 2' },
    { category: 'Greedy', level: 3, problem: 'Greedy Problem 3' },
    { category: 'Dynamic programming', level: 1, problem: 'Dynamic programming Problem 1' },
    { category: 'Dynamic programming', level: 2, problem: 'Dynamic programming Problem 2' },
    { category: 'Dynamic programming', level: 3, problem: 'Dynamic programming Problem 3' }
]

const solvedProblems = [
    { category: 'Greedy', level: 1, problem: 'Greedy Problem 1' },
    { category: 'Greedy', level: 2, problem: 'Greedy Problem 2' },
    { category: 'Dynamic programming', level: 1, problem: 'Dynamic programming Problem 1' }
]

const recommendationsNewUser = makeRecommendations('newUser', problemCategories, [], allProblems, 2)
console.log("Recommendations for new user:", recommendationsNewUser)

const recommendationsExistingUser = makeRecommendations('existingUser', problemCategories, solvedProblems, allProblems, 2)
console.log("Recommendations for existing user:", recommendationsExistingUser)
