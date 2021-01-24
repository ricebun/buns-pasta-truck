const game = {
    level: "ONE",
    timer: 30,
    lives: 3,
    score: 0,
    ordersCompleted: 0,
    currentOrder: {},
    playerInput: [],
    orderIsRight: true
}

const levelUp = {
    // <current level>: [<level in number>, <min score to level up>, <next level>]
    "ONE": [1, 15, "TWO"],
    "TWO": [2, 20, "THREE"],
    "THREE": [3, 23, "FOUR"],
    "FOUR": [4, 25, "FIVE"],
    "FIVE": [5, null, null]
}

// Create master recipe book
const allRecipes = {
    meatballmarinara: {
        dishname: "Meatball Marinara",
        ingredients: ["Spaghetti", "Meatballs", "Tomato Sauce"]
    },
    carbonara: {
        dishname: "Carbonara",
        ingredients: ["Spaghetti", "Pancetta", "Parmesan", "Egg"]
    },
    pesto: {
        dishname: "Pesto Spaghetti",
        ingredients: ["Spaghetti", "Pesto"]
    },
    alfunghi: {
        dishname: "Spaghetti Al Funghi",
        ingredients: ["Spaghetti", "Mushroom"]
    },
    cheesytomato: {
        dishname: "Cheesy Tomato Spaghetti",
        ingredients: ["Spaghetti", "Parmesan", "Tomato Sauce"]
    }
    // aglioolio: {
    //     dishname: "Aglio Olio",
    //     ingredients: ["Spaghetti", "Garlic", "Chilli Flakes"]
    // }
}

const recipeKeys = Object.keys(allRecipes)

const customers = ["./customers/customer1.png", "./customers/customer2.png", "./customers/customer3.png", "./customers/customer4.png", "./customers/customer5.png", "./customers/customer6.png", "./customers/customer7.png", "./customers/customer8.png"]

const ingredientImages = {
    spaghetti: "./img2/pastaball.png",
    mushroom: "./img2/mushroom.png",
    pancetta: "./img2/pancetta.png",
    egg: "./img2/egg.png",
    parmesan: "./img2/cheese.png",
    meatball: "./img2/meatballs.png",
    tomatosauce: "./img2/tomatosauce.png",
    pesto: "./img2/pesto.png"
}

// setup click
const setup = () => {
    $recipescreen.hide()
    $gameplay.hide()
    $(".gameend").hide()
    $cookingcloud.hide()
    $playbutton.on("click", renderRecipes)
    $startbutton.on("click", renderGameplay)
    $hintbutton.unbind().on("click", showHint)
    $closehintbutton.on("click", closeHint)
    $helpbutton.on("click", showHelp)
    $closehelpbutton.on("click", closeHelp)
    $endgamebutton.on("click", backToOpening)
    $removebutton.on("click", removeIngredient)
    $submitbutton.on("click", submitDish)
    $playagainbutton.on("click", renderRecipes)
}

const renderRecipes = () => {
    $recipescreen.show()
    $gameover.hide()
    $openingandcredit.hide()
}

const renderGameplay = () => {
    $recipescreen.hide()
    $gameplay.show()
    $(".gameend").hide()
    $popup.hide()
    $hint.hide()
    $help.hide()
    $stovetop.empty().show()
    $("#windowcustomer").remove()
    $toggles.show()

    if (game.level === "ONE") {
        renderGameStats("New Game")
    } else {
        renderGameStats("Next Level")
    }

    setTimeout(showCurrentOrder, 500)
    chooseIngredients()
}

const renderGameStats = (gameState) => {
    if (gameState === "New Game" || gameState === "Next Level") {
        game.timer = 30
        game.score = 0
        game.ordersCompleted = 0
        const timerCountdown = setInterval(() => {
            if (game.timer === 0) {
                clearInterval(timerCountdown)
                renderNextStage()
            }
            $timer.text(game.timer)
            game.timer--
        }, 1000)

        if (gameState === "New Game") {
            game.level = "ONE"
            game.lives = 3
        }
    }

    if (gameState === "Next Level") {
        game.timer = 30
        game.score = 0
        game.ordersCompleted = 0
    }

    $level.text(game.level)
    $lives.text(game.lives)
    $score.text(game.score)
    $orderscompleted.text(game.ordersCompleted)
}

const generateOrderMsg = (dishname) => {
    const orderMsgs = [`Hey buddy, ${dishname} to go.`, `${dishname} pronto! I'm late for my meeting.`, `How are you today? May I have a ${dishname} please?`, `Whip me up a good ${dishname}!`, `One serving of ${dishname} please!`, `Hello, ${dishname} please.`]

    let orderMsgNum = Math.floor(Math.random() * orderMsgs.length)
    return orderMsgs[orderMsgNum]
}

const showCurrentOrder = () => {
    let customerNum = Math.floor(Math.random() * customers.length)
    let $customerImg = $("<img>").attr({
        src: customers[customerNum],
        id: "windowcustomer"
    })
    console.log("Customer: " + customerNum)
    $orders.prepend($customerImg)

    let recipeNum = Math.floor(Math.random() * recipeKeys.length);
    console.log("Recipe: " + recipeNum)
    game.currentOrder = allRecipes[recipeKeys[recipeNum]]
    $currentorder.text(generateOrderMsg(game.currentOrder.dishname)).show()

    generateHint()
}

const backToOpening = () => {
    $gameplay.hide()
    $gameend.hide()
    $("#windowcustomer").remove()
    $currentorder.hide()
    $openingandcredit.show()
}

const generateHint = () => {
    $hintlist.empty()
    for (i = 0; i < game.currentOrder.ingredients.length; i++) {
        $hintlist.append($("<p>").text(game.currentOrder.ingredients[i]))
    }
}

const showHint = () => {
    console.log("hint clicked")
    $hint.show()
}

const closeHint = () => {
    $hint.hide()
}

const showHelp = () => {
    $help.show()
}

const closeHelp = () => {
    $help.hide()
}

const chooseIngredients = () => {
    $(".ingredients").unbind().on("click", () => {
        game.playerInput.push($(event.target).text())
        $stovetop.append($("<img>").attr({
            src: ingredientImages[event.target.id],
            class: "stovetopingredients"
        }))
        console.log("ingredient clicked: " + event.target.id)
        console.log("Current input array: " + game.playerInput)
    })
}

const removeIngredient = () => {
    let lastIngredient = game.playerInput.pop()
    $("#stovetop img:last-child").remove()
    console.log("Remove button clicked. Removed: " + lastIngredient)
    console.log("New input array: " + game.playerInput)
}

const submitDish = () => {
    $stovetop.hide()
    $cookingcloud.show()
    $toggles.hide()
    console.log("Cooking... " + game.playerInput)
    checkInput()
}

const checkInput = () => {
    let orderedInputScore = 0
    let unorderedInputScore = 0
    let inputToCheck = game.playerInput
    let reference = game.currentOrder.ingredients

    if (inputToCheck.length === reference.length) {
        for (let i = 0; i < inputToCheck.length; i++) {
            if (inputToCheck[i] === reference[i]) {
                orderedInputScore++;
            }
        }

        if (orderedInputScore === reference.length) {
            orderIsRight = true
            game.score += 5
            game.ordersCompleted++
        } else {
            for (let i = 0; i < reference.length; i++) {
                if (inputToCheck.includes(reference[i])) {
                    unorderedInputScore++
                }
            }
            if (unorderedInputScore === reference.length) {
                orderIsRight = true
                game.score += 3
                game.ordersCompleted++
            } else {
                orderIsRight = false
                game.lives--
            }
        }
    } else {
        orderIsRight = false
        game.lives--
    }

    console.log("ordered score: " + orderedInputScore)
    console.log("unordered score: " + unorderedInputScore)

    setTimeout(() => {
        showResult()
        if (game.lives > 0) {
            nextRound()
        } else {
            renderGameOver()
        }
    }, 800)
}

const showResult = () => {
    if (orderIsRight) {
        $("#rightorder").show()
    } else if (!orderIsRight) {
        $("#wrongorder").show()
    }
}

const clearPreviousGame = () => {
    game.playerInput = []
    $cookingcloud.hide()
    $("#windowcustomer").remove()
    $currentorder.hide()
}

const nextRound = () => {
    renderGameStats()

    setTimeout(() => {
        clearPreviousGame()
        $popup.hide()
        $stovetop.empty().show()
        $toggles.show()
        showCurrentOrder();
        chooseIngredients();
    }, 800)
}

const renderGameOverMsg = (ordersCompleted) => {
    const gameOverMsgs = [
        {
            min: 7,
            max: 50,
            message: `Wow, ${ordersCompleted} orders completed! You're a natural at this! Keep this up and Bun won't even have to lift a finger after he recovers.`
        },
        {
            min: 3,
            max: 6,
            message: `Not bad!! ${ordersCompleted} orders! You learn fast.`
        },
        {
            min: 2,
            max: 2,
            message: `You only completed ${ordersCompleted} orders??!! It's a miracle you still have your job.`
        },
        {
            min: 1,
            max: 1,
            message: `You only completed ${ordersCompleted} order??!! It's a miracle you still have your job.`
        },
        {
            min: 0,
            max: 0,
            message: `You couldn't even complete 1 order? Wonder how you got hired!`
        }
    ]
    for (i = 0; i < gameOverMsgs.length; i++) {
        if (ordersCompleted >= gameOverMsgs[i].min && ordersCompleted <= gameOverMsgs[i].max) {
            $("#gameoverstats").text(gameOverMsgs[i].message)
        }
    }
}

const renderNextStage = () => {
    if ((levelUp[game.level][0] < 5) && (game.score >= levelUp[game.level][1])) {
        $gameplay.hide()
        $levelup.show()
        clearPreviousGame()
        game.level = levelUp[game.level][2]
        setTimeout(renderGameplay, 1000)
    } else if (levelUp[game.level][0] === 5) {
        setTimeout(() => {
            $gameplay.hide()
            $("#gamecomplete").show()
        }, 1000)
    } else if ((game.score < levelUp[game.level][1])) {
        renderGameOver()
    }
}

const renderGameOver = () => {
    setTimeout(() => {
        $gameplay.hide()
        $gameover.show()
        clearPreviousGame()
        renderGameOverMsg(game.ordersCompleted)
    }, 1000)
}

$(() => {
    $openingandcredit = $("#openingandcredit")
    $recipescreen = $("#recipescreen")
    $gameplay = $("#gameplay")
    $levelup = $("#levelup")
    $level = $("#level")
    $lives = $("#lives")
    $score = $("#score")
    $timer = $("#timer")
    $orderscompleted = $("#orderscompleted")
    $orders = $("#orders")
    $currentorder = $("#currentorder")
    $hint = $("#hint")
    $hintlist = $("#hintlist")
    $help = $("#help")
    $toggles = $("#toggles")
    $stovetop = $("#stovetop")
    $cookingcloud = $("#cookingcloud")
    $popup = $(".popup")
    $gameover = $("#gameover")
    $gameend = $(".gameend")
    $playbutton = $("#playbutton")
    $startbutton = $("#startbutton")
    $hintbutton = $("#hintbutton")
    $closehintbutton = $("#closehintbutton")
    $helpbutton = $("#helpbutton")
    $closehelpbutton = $("#closehelpbutton")
    $endgamebutton = $(".endgamebutton")
    $removebutton = $("#removebutton")
    $submitbutton = $("#submitbutton")
    $playagainbutton = $(".playagainbutton")
    setup()
});