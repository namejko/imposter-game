// 100 Question Sets for Thanksgiving Family Imposter Game
// Each set has a realQuestion (most players get) and imposterQuestion (one player gets)
// Both questions should elicit similar answers but with hilariously different contexts

const questionSets = [
  // Skills & Abilities (1-10)
  {
    realQuestion: "What's a skill you wish you could learn?",
    imposterQuestion: "What skill would be most useful for committing crimes?"
  },
  {
    realQuestion: "What talent do you admire in others?",
    imposterQuestion: "What talent would help you get away with something illegal?"
  },
  {
    realQuestion: "What hobby would you pick up if you had more time?",
    imposterQuestion: "What hobby would make people think you're suspicious?"
  },
  {
    realQuestion: "What superpower would you want?",
    imposterQuestion: "What superpower would make you the best villain?"
  },
  {
    realQuestion: "What language would you love to speak fluently?",
    imposterQuestion: "What language would be most useful for evading authorities?"
  },
  {
    realQuestion: "What skill makes someone attractive?",
    imposterQuestion: "What skill makes someone seem like a serial killer?"
  },
  {
    realQuestion: "What's something you're secretly good at?",
    imposterQuestion: "What's something you'd be embarrassed if your family knew you were good at?"
  },
  {
    realQuestion: "What career skill do you wish you had?",
    imposterQuestion: "What skill would help you embezzle money?"
  },
  {
    realQuestion: "What's a useful life skill everyone should learn?",
    imposterQuestion: "What skill would help you survive in prison?"
  },
  {
    realQuestion: "What talent would you want to master overnight?",
    imposterQuestion: "What talent would make stalking easier?"
  },

  // Places & Travel (11-20)
  {
    realQuestion: "What country would you love to visit?",
    imposterQuestion: "What country seems like it's always at war?"
  },
  {
    realQuestion: "What's your favorite peaceful place to relax?",
    imposterQuestion: "Where would be the best place to hide a body?"
  },
  {
    realQuestion: "Where would you love to retire?",
    imposterQuestion: "Where would you flee to avoid prosecution?"
  },
  {
    realQuestion: "What city has the best nightlife?",
    imposterQuestion: "What city has the most crime?"
  },
  {
    realQuestion: "What's a romantic vacation destination?",
    imposterQuestion: "What destination is known for human trafficking?"
  },
  {
    realQuestion: "Where would you go for adventure travel?",
    imposterQuestion: "Where would you go to disappear forever?"
  },
  {
    realQuestion: "What's a great place for a family vacation?",
    imposterQuestion: "What's a place you would never take your kids?"
  },
  {
    realQuestion: "What hidden gem travel spot would you recommend?",
    imposterQuestion: "What location would be perfect for hiding from the FBI?"
  },
  {
    realQuestion: "Where would you go for peace and quiet?",
    imposterQuestion: "Where would no one hear you scream?"
  },
  {
    realQuestion: "What country has the most beautiful landscapes?",
    imposterQuestion: "What country has the most corrupt government?"
  },

  // Celebrities & People (21-30)
  {
    realQuestion: "What celebrity would you love to meet?",
    imposterQuestion: "What celebrity do you find the most annoying?"
  },
  {
    realQuestion: "Who would you want to have dinner with?",
    imposterQuestion: "Who would you want to punch in the face?"
  },
  {
    realQuestion: "What historical figure do you admire?",
    imposterQuestion: "What historical figure was actually terrible?"
  },
  {
    realQuestion: "Who's your celebrity crush?",
    imposterQuestion: "What celebrity gives you the creeps?"
  },
  {
    realQuestion: "Who would you want as a mentor?",
    imposterQuestion: "Who would be the worst person to be stuck with?"
  },
  {
    realQuestion: "What actor deserves more recognition?",
    imposterQuestion: "What actor should never work again?"
  },
  {
    realQuestion: "Who would you trust with your secrets?",
    imposterQuestion: "Who would definitely blackmail you?"
  },
  {
    realQuestion: "What musician would you see in concert?",
    imposterQuestion: "What musician's voice is like nails on a chalkboard?"
  },
  {
    realQuestion: "Who inspires you the most?",
    imposterQuestion: "Who do you think is a complete fraud?"
  },
  {
    realQuestion: "What athlete do you admire?",
    imposterQuestion: "What athlete is definitely on steroids?"
  },

  // Food & Dining (31-40)
  {
    realQuestion: "What food could you eat every day?",
    imposterQuestion: "What food would be the hardest to give up in prison?"
  },
  {
    realQuestion: "What's your comfort food?",
    imposterQuestion: "What food makes you physically ill?"
  },
  {
    realQuestion: "What's the best thing to bring to a potluck?",
    imposterQuestion: "What food at a potluck do you secretly think is gross?"
  },
  {
    realQuestion: "What restaurant has the best food?",
    imposterQuestion: "What restaurant probably has health code violations?"
  },
  {
    realQuestion: "What's your favorite holiday dish?",
    imposterQuestion: "What holiday dish does someone always ruin?"
  },
  {
    realQuestion: "What cuisine should everyone try?",
    imposterQuestion: "What cuisine is overrated and not worth the hype?"
  },
  {
    realQuestion: "What's the best late-night snack?",
    imposterQuestion: "What's the most shameful thing you've eaten at 2 AM?"
  },
  {
    realQuestion: "What food reminds you of childhood?",
    imposterQuestion: "What food did your parents force you to eat?"
  },
  {
    realQuestion: "What's your go-to meal to cook?",
    imposterQuestion: "What meal have you completely failed at making?"
  },
  {
    realQuestion: "What dessert is impossible to resist?",
    imposterQuestion: "What dessert looks disgusting but people pretend to like?"
  },

  // Activities & Pastimes (41-50)
  {
    realQuestion: "What do you do to relax on weekends?",
    imposterQuestion: "What do you do when you're supposed to be working?"
  },
  {
    realQuestion: "What's a fun party activity?",
    imposterQuestion: "What party activity always gets awkward?"
  },
  {
    realQuestion: "What's your favorite way to exercise?",
    imposterQuestion: "What exercise do you pretend to enjoy but actually hate?"
  },
  {
    realQuestion: "What's a great date activity?",
    imposterQuestion: "What's the worst date you've ever been on?"
  },
  {
    realQuestion: "What's a wholesome family activity?",
    imposterQuestion: "What family activity always ends in an argument?"
  },
  {
    realQuestion: "What hobby brings you joy?",
    imposterQuestion: "What hobby do you think is a complete waste of time?"
  },
  {
    realQuestion: "What sport is fun to watch?",
    imposterQuestion: "What sport is incredibly boring?"
  },
  {
    realQuestion: "What game brings people together?",
    imposterQuestion: "What game has ruined friendships?"
  },
  {
    realQuestion: "What's a creative outlet you enjoy?",
    imposterQuestion: "What creative thing do people do that's actually terrible?"
  },
  {
    realQuestion: "What outdoor activity do you love?",
    imposterQuestion: "What outdoor activity seems like a form of torture?"
  },

  // Qualities & Characteristics (51-60)
  {
    realQuestion: "What quality do you look for in a friend?",
    imposterQuestion: "What quality in people annoys you the most?"
  },
  {
    realQuestion: "What makes someone a good partner?",
    imposterQuestion: "What's an instant deal-breaker in dating?"
  },
  {
    realQuestion: "What personality trait do you admire?",
    imposterQuestion: "What personality trait makes you avoid someone?"
  },
  {
    realQuestion: "What makes someone trustworthy?",
    imposterQuestion: "What makes someone seem untrustworthy?"
  },
  {
    realQuestion: "What's your best quality?",
    imposterQuestion: "What quality do people secretly hate about you?"
  },
  {
    realQuestion: "What makes a good leader?",
    imposterQuestion: "What makes someone a terrible boss?"
  },
  {
    realQuestion: "What trait makes someone attractive?",
    imposterQuestion: "What trait is an instant turn-off?"
  },
  {
    realQuestion: "What makes someone fun to be around?",
    imposterQuestion: "What makes someone exhausting to be around?"
  },
  {
    realQuestion: "What's an underrated quality in people?",
    imposterQuestion: "What quality do people brag about that's actually annoying?"
  },
  {
    realQuestion: "What makes someone wise?",
    imposterQuestion: "What makes someone seem pretentious?"
  },

  // Movies & Entertainment (61-70)
  {
    realQuestion: "What movie can you watch over and over?",
    imposterQuestion: "What movie did everyone love that you thought was terrible?"
  },
  {
    realQuestion: "What show do you recommend to everyone?",
    imposterQuestion: "What show is overrated and not worth watching?"
  },
  {
    realQuestion: "What movie made you cry?",
    imposterQuestion: "What movie made you uncomfortable?"
  },
  {
    realQuestion: "What's a feel-good movie?",
    imposterQuestion: "What movie has a really disturbing hidden meaning?"
  },
  {
    realQuestion: "What character do you relate to?",
    imposterQuestion: "What character do people love that's actually the villain?"
  },
  {
    realQuestion: "What classic movie should everyone see?",
    imposterQuestion: "What 'classic' movie is actually boring?"
  },
  {
    realQuestion: "What genre do you enjoy most?",
    imposterQuestion: "What genre do you judge people for watching?"
  },
  {
    realQuestion: "What movie has the best soundtrack?",
    imposterQuestion: "What movie was ruined by bad music choices?"
  },
  {
    realQuestion: "What sequel was actually good?",
    imposterQuestion: "What sequel completely ruined the franchise?"
  },
  {
    realQuestion: "What animated movie do you love?",
    imposterQuestion: "What kids' movie is actually inappropriate?"
  },

  // Memories & Experiences (71-80)
  {
    realQuestion: "What's your favorite childhood memory?",
    imposterQuestion: "What's your most embarrassing childhood memory?"
  },
  {
    realQuestion: "What's a moment you're proud of?",
    imposterQuestion: "What's something you did that you regret?"
  },
  {
    realQuestion: "What's a funny story from your past?",
    imposterQuestion: "What story would your family never let you forget?"
  },
  {
    realQuestion: "What experience changed your life?",
    imposterQuestion: "What experience traumatized you?"
  },
  {
    realQuestion: "What's a happy memory with friends?",
    imposterQuestion: "What's a time your friends let you down?"
  },
  {
    realQuestion: "What tradition do you cherish?",
    imposterQuestion: "What tradition is your family weirdly obsessed with?"
  },
  {
    realQuestion: "What was your best vacation ever?",
    imposterQuestion: "What vacation was a complete disaster?"
  },
  {
    realQuestion: "What accomplishment are you proud of?",
    imposterQuestion: "What accomplishment do you secretly think was a fluke?"
  },
  {
    realQuestion: "What's a lesson you learned the hard way?",
    imposterQuestion: "What's something dumb you did that you'll never admit?"
  },
  {
    realQuestion: "What milestone meant a lot to you?",
    imposterQuestion: "What milestone was overhyped and disappointing?"
  },

  // Hypotheticals & Dreams (81-90)
  {
    realQuestion: "What would you do with a million dollars?",
    imposterQuestion: "What's the most irresponsible thing you'd buy?"
  },
  {
    realQuestion: "What's on your bucket list?",
    imposterQuestion: "What's something dangerous you want to try?"
  },
  {
    realQuestion: "What job would you have in another life?",
    imposterQuestion: "What job would be your worst nightmare?"
  },
  {
    realQuestion: "What would your dream house have?",
    imposterQuestion: "What would your secret bunker have?"
  },
  {
    realQuestion: "What era would you visit if you could time travel?",
    imposterQuestion: "What era would be the worst to live in?"
  },
  {
    realQuestion: "What would you want to be famous for?",
    imposterQuestion: "What would be the most embarrassing thing to be famous for?"
  },
  {
    realQuestion: "What's your dream retirement?",
    imposterQuestion: "What do you fear about getting old?"
  },
  {
    realQuestion: "What fictional world would you live in?",
    imposterQuestion: "What fictional world would be horrible to actually live in?"
  },
  {
    realQuestion: "What would you wish for?",
    imposterQuestion: "What wish would backfire horribly?"
  },
  {
    realQuestion: "What legacy do you want to leave?",
    imposterQuestion: "What would be embarrassing to have on your tombstone?"
  },

  // Family & Relationships (91-100)
  {
    realQuestion: "What's the best thing about your family?",
    imposterQuestion: "What's the weirdest thing about your family?"
  },
  {
    realQuestion: "What family member do you admire?",
    imposterQuestion: "What family member drives you crazy?"
  },
  {
    realQuestion: "What's great advice your parents gave you?",
    imposterQuestion: "What's terrible advice your parents gave you?"
  },
  {
    realQuestion: "What's a family tradition you love?",
    imposterQuestion: "What's a family tradition you secretly hate?"
  },
  {
    realQuestion: "What do you appreciate most about Thanksgiving?",
    imposterQuestion: "What do you dread most about Thanksgiving?"
  },
  {
    realQuestion: "What relative tells the best stories?",
    imposterQuestion: "What relative never knows when to stop talking?"
  },
  {
    realQuestion: "What's the best family gathering you've had?",
    imposterQuestion: "What family gathering went completely wrong?"
  },
  {
    realQuestion: "What's something special your family does?",
    imposterQuestion: "What's something embarrassing your family does?"
  },
  {
    realQuestion: "What life lesson did you learn from family?",
    imposterQuestion: "What bad habit did you pick up from family?"
  },
  {
    realQuestion: "What makes your family unique?",
    imposterQuestion: "What makes your family dysfunctional?"
  }
];

export default questionSets;
