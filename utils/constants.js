// 生成模拟球友数据
export const generatePlayers = (count, startIndex) => {
  const VENUES = ['李宁羽毛球中心', '飞扬羽毛球馆', '奥体中心体育馆', '胜道球馆', '万国体育中心']
  const RACKETS = ['Yonex 100ZZ', 'Yonex Arc11', 'Lining 9000C', 'Victor 龙牙之刃', 'Victor 90K', 'Yonex NF700']
  const SHUTTLES = ['RSL No.5', 'Yonex AS-05', '李宁 A+60', '亚狮龙4号', '航空EG1130', '威克多金黄3号']
  
  return Array.from({ length: count }).map((_, i) => {
    const id = (startIndex + i).toString()
    const isFemale = i % 3 === 0
    const levelScore = Number((Math.random() * 5 + 3).toFixed(1))
    const intents = ['SINGLES', 'DOUBLES', 'TRAINING', 'ANY']
    const randomIntent = intents[Math.floor(Math.random() * intents.length)]
    
    const venueWeight = Math.random()
    let venue = VENUES[0]
    if (venueWeight > 0.6) venue = VENUES[1]
    else if (venueWeight > 0.4) venue = VENUES[2]
    else if (venueWeight > 0.2) venue = VENUES[3]
    else if (venueWeight > 0.1) venue = VENUES[4]

    const locations = ['3号场', '5号场', '休息区', '更衣室门口', 'A馆看台', undefined]
    const randomLocation = locations[Math.floor(Math.random() * locations.length)]
    const distanceMeters = Math.floor(Math.random() * 800)

    const minutesAgo = i < 3 ? 0 : Math.floor(Math.random() * 60)
    const intentTimestamp = Date.now() - minutesAgo * 60 * 1000
    
    // 关系状态
    let rel = 'NONE'
    const relRand = Math.random()
    if (id === '1') rel = 'FOLLOWING'
    
    // 装备数据
    const tension = levelScore > 7 ? Math.floor(Math.random() * 4 + 26) : Math.floor(Math.random() * 4 + 22)
    const racket = RACKETS[Math.floor(Math.random() * RACKETS.length)]
    const shuttlecock = SHUTTLES[Math.floor(Math.random() * SHUTTLES.length)]

    return {
      id,
      name: isFemale ? `羽球甜心${id}号` : `暴力杀球手${id}`,
      gender: isFemale ? 'F' : 'M',
      avatarColor: isFemale ? 'bg-pink-100 text-pink-500' : 'bg-blue-100 text-blue-600',
      levelTitle: levelScore > 7 ? '进阶球手' : '羽球萌新',
      levelScore: levelScore,
      distance: `${distanceMeters}m`,
      distanceMeters: distanceMeters,
      venue: venue,
      specificLocation: randomLocation,
      status: ['LOOKING', 'PLAYING', 'RESTING', 'SOCIAL'][i % 4],
      intent: randomIntent,
      intentTime: minutesAgo === 0 ? '刚刚' : `${minutesAgo}分钟前`,
      intentTimestamp,
      relationship: rel,
      tags: isFemale ? ['混双', '网前'] : ['单打', '重杀'],
      bio: '寻找志同道合的球友，每周固定打球。脾气好不甩锅，接发球稳定。',
      isFollowing: rel !== 'NONE',
      followersCount: Math.floor(Math.random() * 200),
      appreciations: Math.floor(Math.random() * 50),
      gear: {
        racket,
        tension,
        shuttlecock
      }
    }
  })
}

// 获取意图配置
export const getIntentConfig = (intent) => {
  switch (intent) {
    case 'SINGLES': 
      return { 
        label: '求单打', 
        icon: 'Sword', 
        color: '#ea580c', 
        bg: 'bg-orange-100' 
      }
    case 'DOUBLES': 
      return { 
        label: '缺双打', 
        icon: 'Users', 
        color: '#2563eb', 
        bg: 'bg-blue-100' 
      }
    case 'TRAINING': 
      return { 
        label: '练球', 
        icon: 'Target', 
        color: '#059669', 
        bg: 'bg-emerald-100' 
      }
    default: 
      return { 
        label: '随便打', 
        icon: 'Activity', 
        color: '#6b7280', 
        bg: 'bg-gray-100' 
      }
  }
}

// 获取状态配置
export const getStatusConfig = (status) => {
  switch (status) {
    case 'LOOKING': 
      return { 
        label: '等球来', 
        color: 'text-yu-black', 
        icon: 'Power', 
        bg: 'bg-yu-brand' 
      }
    case 'PLAYING': 
      return { 
        label: '激战中', 
        color: 'text-white', 
        icon: 'Flame', 
        bg: 'bg-rose-500' 
      }
    case 'RESTING': 
      return { 
        label: '休息中', 
        color: 'text-white', 
        icon: 'Coffee', 
        bg: 'bg-gray-400' 
      }
    case 'SOCIAL': 
      return { 
        label: '交朋友', 
        color: 'text-white', 
        icon: 'MessageCircle', 
        bg: 'bg-indigo-500' 
      }
    case 'IDLE': 
    default: 
      return { 
        label: '发布状态', 
        color: 'text-gray-400', 
        icon: 'Plus', 
        bg: 'bg-white' 
      }
  }
}

// 邀请信号
export const INVITE_SIGNALS = [
  { id: 1, text: '三缺一，来救场！', icon: 'HelpCircle' },
  { id: 2, text: '想打单打，出汗局', icon: 'Sword' },
  { id: 3, text: '新手求带，请喝水', icon: 'Coffee' },
  { id: 4, text: '就在附近，速来', icon: 'Zap' }
]