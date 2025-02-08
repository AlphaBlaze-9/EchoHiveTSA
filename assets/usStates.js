const usStatesWithPollinators = [
    { 
        state: "Alabama", 
        pollinators: ["Honeybee", "Bumblebee", "Carpenter Bee", "Monarch Butterfly", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Carpenter Bee": 60, "Monarch Butterfly": 50, "Ruby-throated Hummingbird": 55 }
    },
    { 
        state: "Alaska", 
        pollinators: ["Bumblebee", "Hoverfly", "Mason Bee", "Cabbage White Butterfly", "White-crowned Sparrow"],
        popularity: { "Bumblebee": 75, "Hoverfly": 70, "Mason Bee": 65, "Cabbage White Butterfly": 50, "White-crowned Sparrow": 40 }
    },
    { 
        state: "Arizona", 
        pollinators: ["Honeybee", "Cactus Bee", "Hummingbird Moth", "Black-chinned Hummingbird", "Pipevine Swallowtail"],
        popularity: { "Honeybee": 85, "Cactus Bee": 70, "Hummingbird Moth": 60, "Black-chinned Hummingbird": 50, "Pipevine Swallowtail": 30 }
    },
    { 
        state: "Arkansas", 
        pollinators: ["Honeybee", "Bumblebee", "Eastern Tiger Swallowtail", "Ruby-throated Hummingbird", "Mason Bee"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Eastern Tiger Swallowtail": 65, "Ruby-throated Hummingbird": 55, "Mason Bee": 60 }
    },
    { 
        state: "California", 
        pollinators: ["Honeybee", "Western Monarch Butterfly", "Anna's Hummingbird", "Sweat Bee", "Painted Lady Butterfly"],
        popularity: { "Honeybee": 85, "Western Monarch Butterfly": 75, "Anna's Hummingbird": 65, "Sweat Bee": 60, "Painted Lady Butterfly": 50 }
    },
    { 
        state: "Colorado", 
        pollinators: ["Honeybee", "Bumblebee", "Broad-tailed Hummingbird", "Sweat Bee", "Painted Lady Butterfly"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Broad-tailed Hummingbird": 70, "Sweat Bee": 65, "Painted Lady Butterfly": 55 }
    },
    { 
        state: "Connecticut", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Carpenter Bee", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Monarch Butterfly": 70, "Carpenter Bee": 60, "Ruby-throated Hummingbird": 65 }
    },
    { 
        state: "Delaware", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Carpenter Bee", "Eastern Tiger Swallowtail"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Monarch Butterfly": 70, "Carpenter Bee": 60, "Eastern Tiger Swallowtail": 60 }
    },
    { 
        state: "Florida", 
        pollinators: ["Honeybee", "Zebra Longwing Butterfly", "Gulf Fritillary", "Ruby-throated Hummingbird", "Sweat Bee"],
        popularity: { "Honeybee": 85, "Zebra Longwing Butterfly": 75, "Gulf Fritillary": 65, "Ruby-throated Hummingbird": 70, "Sweat Bee": 60 }
    },
    { 
        state: "Georgia", 
        pollinators: ["Honeybee", "Bumblebee", "Eastern Tiger Swallowtail", "Ruby-throated Hummingbird", "Mason Bee"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Eastern Tiger Swallowtail": 70, "Ruby-throated Hummingbird": 60, "Mason Bee": 65 }
    },
    { 
        state: "Hawaii", 
        pollinators: ["Yellow-faced Bee", "Honeybee", "Monarch Butterfly", "Hawaiian Hoary Bat", "Hummingbird Moth"],
        popularity: { "Yellow-faced Bee": 75, "Honeybee": 70, "Monarch Butterfly": 65, "Hawaiian Hoary Bat": 60, "Hummingbird Moth": 50 }
    },
    { 
        state: "Idaho", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Monarch Butterfly", "Sweat Bee"],
        popularity: { "Honeybee": 85, "Bumblebee": 80, "Mason Bee": 70, "Monarch Butterfly": 60, "Sweat Bee": 60 }
    },
    { 
        state: "Illinois", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Eastern Tiger Swallowtail", "Carpenter Bee"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Monarch Butterfly": 70, "Eastern Tiger Swallowtail": 65, "Carpenter Bee": 60 }
    },
    { 
        state: "Indiana", 
        pollinators: ["Honeybee", "Bumblebee", "Carpenter Bee", "Monarch Butterfly", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Carpenter Bee": 70, "Monarch Butterfly": 60, "Ruby-throated Hummingbird": 55 }
    },
    { 
        state: "Iowa", 
        pollinators: ["Honeybee", "Bumblebee", "Sweat Bee", "Eastern Tiger Swallowtail", "Monarch Butterfly"],
        popularity: { "Honeybee": 85, "Bumblebee": 80, "Sweat Bee": 70, "Eastern Tiger Swallowtail": 65, "Monarch Butterfly": 65 }
    },
    { 
        state: "Kansas", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Painted Lady Butterfly", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Monarch Butterfly": 75, "Painted Lady Butterfly": 60, "Ruby-throated Hummingbird": 55 }
    },
    { 
        state: "Kentucky", 
        pollinators: ["Honeybee", "Bumblebee", "Eastern Tiger Swallowtail", "Ruby-throated Hummingbird", "Mason Bee"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Eastern Tiger Swallowtail": 70, "Ruby-throated Hummingbird": 60, "Mason Bee": 65 }
    },
    { 
        state: "Louisiana", 
        pollinators: ["Honeybee", "Bumblebee", "Ruby-throated Hummingbird", "Monarch Butterfly", "Sweat Bee"],
        popularity: { "Honeybee": 95, "Bumblebee": 90, "Ruby-throated Hummingbird": 80, "Monarch Butterfly": 60, "Sweat Bee": 70 }
    },
    { 
        state: "Maine", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Eastern Tiger Swallowtail", "Monarch Butterfly"],
        popularity: { "Honeybee": 95, "Bumblebee": 85, "Mason Bee": 70, "Eastern Tiger Swallowtail": 55, "Monarch Butterfly": 65 }
    },
    { 
        state: "Maryland", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Eastern Tiger Swallowtail", "Carpenter Bee"],
        popularity: { "Honeybee": 97, "Bumblebee": 90, "Monarch Butterfly": 80, "Eastern Tiger Swallowtail": 70, "Carpenter Bee": 65 }
    },
    { 
        state: "Massachusetts", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Mason Bee", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 93, "Bumblebee": 85, "Monarch Butterfly": 75, "Mason Bee": 60, "Ruby-throated Hummingbird": 70 }
    },
    { 
        state: "Michigan", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Sweat Bee", "Eastern Tiger Swallowtail"],
        popularity: { "Honeybee": 92, "Bumblebee": 85, "Monarch Butterfly": 80, "Sweat Bee": 75, "Eastern Tiger Swallowtail": 70 }
    },
    { 
        state: "Minnesota", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Mason Bee", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 93, "Bumblebee": 88, "Monarch Butterfly": 85, "Mason Bee": 70, "Ruby-throated Hummingbird": 60 }
    },
    { 
        state: "Mississippi", 
        pollinators: ["Honeybee", "Bumblebee", "Eastern Tiger Swallowtail", "Ruby-throated Hummingbird", "Sweat Bee"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Eastern Tiger Swallowtail": 70, "Ruby-throated Hummingbird": 70, "Sweat Bee": 60 }
    },
    { 
        state: "Missouri", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Eastern Tiger Swallowtail", "Mason Bee"],
        popularity: { "Honeybee": 96, "Bumblebee": 88, "Monarch Butterfly": 80, "Eastern Tiger Swallowtail": 70, "Mason Bee": 65 }
    },
    { 
        state: "Montana", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Monarch Butterfly", "Sweat Bee"],
        popularity: { "Honeybee": 91, "Bumblebee": 80, "Mason Bee": 70, "Monarch Butterfly": 75, "Sweat Bee": 65 }
    },
    { 
        state: "Nebraska", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Eastern Tiger Swallowtail", "Sweat Bee"],
        popularity: { "Honeybee": 94, "Bumblebee": 85, "Monarch Butterfly": 75, "Eastern Tiger Swallowtail": 70, "Sweat Bee": 65 }
    },
    { 
        state: "Nevada", 
        pollinators: ["Honeybee", "Bumblebee", "Sweat Bee", "Carpenter Bee", "Painted Lady Butterfly"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Sweat Bee": 70, "Carpenter Bee": 60, "Painted Lady Butterfly": 50 }
    },
    { 
        state: "New Hampshire", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Eastern Tiger Swallowtail", "Monarch Butterfly"],
        popularity: { "Honeybee": 94, "Bumblebee": 85, "Mason Bee": 75, "Eastern Tiger Swallowtail": 70, "Monarch Butterfly": 80 }
    },
    { 
        state: "New Jersey", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Eastern Tiger Swallowtail", "Carpenter Bee"],
        popularity: { "Honeybee": 96, "Bumblebee": 90, "Monarch Butterfly": 80, "Eastern Tiger Swallowtail": 75, "Carpenter Bee": 60 }
    },
    { 
        state: "New Mexico", 
        pollinators: ["Honeybee", "Bumblebee", "Hummingbird Moth", "Black-chinned Hummingbird", "Pipevine Swallowtail"],
        popularity: { "Honeybee": 92, "Bumblebee": 85, "Hummingbird Moth": 65, "Black-chinned Hummingbird": 55, "Pipevine Swallowtail": 50 }
    },
    { 
        state: "New York", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Carpenter Bee", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 95, "Bumblebee": 88, "Monarch Butterfly": 80, "Carpenter Bee": 65, "Ruby-throated Hummingbird": 70 }
    },
    { 
        state: "North Carolina", 
        pollinators: ["Honeybee", "Bumblebee", "Eastern Tiger Swallowtail", "Ruby-throated Hummingbird", "Mason Bee"],
        popularity: { "Honeybee": 98, "Bumblebee": 90, "Eastern Tiger Swallowtail": 85, "Ruby-throated Hummingbird": 75, "Mason Bee": 60 }
    },
    { 
        state: "North Dakota", 
        pollinators: ["Honeybee", "Bumblebee", "Sweat Bee", "Eastern Tiger Swallowtail", "Monarch Butterfly"],
        popularity: { "Honeybee": 92, "Bumblebee": 83, "Sweat Bee": 70, "Eastern Tiger Swallowtail": 65, "Monarch Butterfly": 80 }
    },
    { 
        state: "Ohio", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Eastern Tiger Swallowtail", "Carpenter Bee"],
        popularity: { "Honeybee": 94, "Bumblebee": 85, "Monarch Butterfly": 80, "Eastern Tiger Swallowtail": 70, "Carpenter Bee": 60 }
    },
    { 
        state: "Oklahoma", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Sweat Bee", "Painted Lady Butterfly"],
        popularity: { "Honeybee": 95, "Bumblebee": 85, "Monarch Butterfly": 75, "Sweat Bee": 70, "Painted Lady Butterfly": 60 }
    },
    { 
        state: "Oregon", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Western Monarch Butterfly", "Anna's Hummingbird"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Mason Bee": 70, "Western Monarch Butterfly": 75, "Anna's Hummingbird": 65 }
    },
    { 
        state: "Pennsylvania", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Eastern Tiger Swallowtail", "Carpenter Bee"],
        popularity: { "Honeybee": 94, "Bumblebee": 85, "Monarch Butterfly": 80, "Eastern Tiger Swallowtail": 70, "Carpenter Bee": 65 }
    },
    { 
        state: "Rhode Island", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Monarch Butterfly", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 98, "Bumblebee": 90, "Mason Bee": 80, "Monarch Butterfly": 85, "Ruby-throated Hummingbird": 70 }
    },
    { 
        state: "South Carolina", 
        pollinators: ["Honeybee", "Bumblebee", "Eastern Tiger Swallowtail", "Ruby-throated Hummingbird", "Mason Bee"],
        popularity: { "Honeybee": 98, "Bumblebee": 90, "Eastern Tiger Swallowtail": 80, "Ruby-throated Hummingbird": 75, "Mason Bee": 65 }
    },
    { 
        state: "South Dakota", 
        pollinators: ["Honeybee", "Bumblebee", "Sweat Bee", "Eastern Tiger Swallowtail", "Monarch Butterfly"],
        popularity: { "Honeybee": 93, "Bumblebee": 85, "Sweat Bee": 70, "Eastern Tiger Swallowtail": 75, "Monarch Butterfly": 80 }
    },
    { 
        state: "Tennessee", 
        pollinators: ["Honeybee", "Bumblebee", "Eastern Tiger Swallowtail", "Ruby-throated Hummingbird", "Mason Bee"],
        popularity: { "Honeybee": 96, "Bumblebee": 85, "Eastern Tiger Swallowtail": 75, "Ruby-throated Hummingbird": 70, "Mason Bee": 65 }
    },
    { 
        state: "Texas", 
        pollinators: ["Honeybee", "Bumblebee", "Black-chinned Hummingbird", "Sweat Bee", "Pipevine Swallowtail"],
        popularity: { "Honeybee": 95, "Bumblebee": 90, "Black-chinned Hummingbird": 70, "Sweat Bee": 80, "Pipevine Swallowtail": 60 }
    },
    { 
        state: "Utah", 
        pollinators: ["Honeybee", "Bumblebee", "Hummingbird Moth", "Mason Bee", "Painted Lady Butterfly"],
        popularity: { "Honeybee": 92, "Bumblebee": 80, "Hummingbird Moth": 60, "Mason Bee": 75, "Painted Lady Butterfly": 65 }
    },
    { 
        state: "Vermont", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Eastern Tiger Swallowtail", "Monarch Butterfly"],
        popularity: { "Honeybee": 94, "Bumblebee": 85, "Mason Bee": 75, "Eastern Tiger Swallowtail": 80, "Monarch Butterfly": 80 }
    },
    { 
        state: "Virginia", 
        pollinators: ["Honeybee", "Bumblebee", "Eastern Tiger Swallowtail", "Ruby-throated Hummingbird", "Mason Bee"],
        popularity: { "Honeybee": 95, "Bumblebee": 85, "Eastern Tiger Swallowtail": 75, "Ruby-throated Hummingbird": 70, "Mason Bee": 65 }
    },
    { 
        state: "Washington", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Western Monarch Butterfly", "Anna's Hummingbird"],
        popularity: { "Honeybee": 90, "Bumblebee": 80, "Mason Bee": 75, "Western Monarch Butterfly": 70, "Anna's Hummingbird": 65 }
    },
    { 
        state: "West Virginia", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Eastern Tiger Swallowtail", "Mason Bee"],
        popularity: { "Honeybee": 94, "Bumblebee": 85, "Monarch Butterfly": 80, "Eastern Tiger Swallowtail": 70, "Mason Bee": 65 }
    },
    { 
        state: "Wisconsin", 
        pollinators: ["Honeybee", "Bumblebee", "Monarch Butterfly", "Mason Bee", "Ruby-throated Hummingbird"],
        popularity: { "Honeybee": 92, "Bumblebee": 85, "Monarch Butterfly": 80, "Mason Bee": 70, "Ruby-throated Hummingbird": 65 }
    },
    { 
        state: "Wyoming", 
        pollinators: ["Honeybee", "Bumblebee", "Mason Bee", "Monarch Butterfly", "Sweat Bee"],
        popularity: { "Honeybee": 91, "Bumblebee": 80, "Mason Bee": 70, "Monarch Butterfly": 75, "Sweat Bee": 65 }
    }
];

export default usStatesWithPollinators;