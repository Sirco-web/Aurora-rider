# Aurora Rider

![Aurora Rider](https://img.shields.io/badge/VR-Rhythm%20Game-ff69b4)
![License](https://img.shields.io/badge/license-MIT-blue)
![A-Frame](https://img.shields.io/badge/A--Frame-1.3.0-orange)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)

**A Free & Open Source VR Rhythm Game with Online Multiplayer!**

Slash beats with your friends in virtual reality! Aurora Rider is a WebVR rhythm game 
featuring real-time online multiplayer, allowing you to compete with friends in 
Classic (saber) or Punch (boxing) mode.

🎮 **[Play Now](https://aurora-rider.onrender.com)** | 🌐 Based on [Moon Rider](https://github.com/supermedium/moonrider)

![Screenshot](assets/img/logo.png)

---

## ✨ Features

### 🎮 Game Modes

| Mode | Description | Controller |
|------|-------------|------------|
| **Classic** | Slice beats with dual sabers - match colors and cut directions | VR Controllers |
| **Punch** | Box your way through beats with your fists | VR Controllers |
| **Ride** | Sit back and enjoy the musical journey (spectator) | Any |
| **Viewer** | Watch the beatmap play itself | Any |

### 🌐 Online Multiplayer (VR Only)

- **Private Rooms** - Create rooms with 6-character join codes
- **Up to 5 Players** - Compete with friends in real-time
- **Live Leaderboards** - See scores update during gameplay
- **Host Controls** - Pick songs, start games, manage the room
- **Game Modes** - Choose Classic or Punch for your room
- **Results Screen** - Compare final scores and accuracy

### 🎵 Content

- **Thousands of Songs** - Integrated with [BeatSaver](https://beatsaver.com) library
- **All Difficulties** - Easy, Normal, Hard, Expert, Expert+
- **Multiple Genres** - EDM, Pop, Rock, Anime, and more
- **Search & Playlists** - Find your favorite songs easily

### 🎨 Customization

- **10 Color Schemes** - Super Medium, Star Warrior, Nordic Noir, and more
- **Left/Right Hand Mode** - Switch dominant hand
- **Speed Modifiers** - Adjust note speed to your preference

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 16+** and npm installed
- **VR Headset** (for full experience) - Quest, Vive, Index, etc.
- Modern browser with WebXR support

### Installation

```bash
# Clone the repository
git clone https://github.com/AuroraStarfall/Aurora-rider.git
cd Aurora-rider

# Install dependencies
npm install

# Start the server (includes multiplayer backend)
npm start
```

Open **http://localhost:3000** in your browser!

### Development Mode

```bash
# Build and watch for changes
npm run start:dev

# Production build
npm run dist
```

### Deploy to Render.com

1. Connect your GitHub repository
2. Set build command: `npm install && npm run dist`
3. Set start command: `npm start`
4. Deploy!

---

## 🎮 How to Play

### Solo Play

1. Click **START** on the intro screen
2. Select a **Game Mode** (Classic, Punch, Ride, or Viewer)
3. Browse or search for a song
4. Select a **Difficulty**
5. Click **PLAY** and enjoy!

### Online Multiplayer

#### Creating a Room

1. Put on your VR headset
2. Click **ONLINE MODE** from the mode menu
3. Click **CREATE ROOM**
4. Select **Classic** or **Punch** mode
5. Enter your username
6. Share the **6-character room code** with friends
7. Click **PICK SONG** to select a song
8. Wait for players, then click **START GAME**

#### Joining a Room

1. Put on your VR headset
2. Click **ONLINE MODE** from the mode menu
3. Click **JOIN ROOM**
4. Enter your username
5. Enter the **6-character room code**
6. Wait for the host to start the game

#### During Gameplay

- Your score syncs in real-time with other players
- See the live leaderboard on the left side of your view
- Complete the song to see final results
- If you finish first, you'll wait for other players

---

## 📁 Project Structure

```
Aurora-rider/
├── server/                 # Multiplayer backend
│   └── index.js            # Express + Socket.IO server
├── src/
│   ├── components/         # A-Frame components (60+ files)
│   │   ├── beat.js         # Beat spawning and hit detection
│   │   ├── blade.js        # Saber physics and collision
│   │   ├── online-mode.js  # Multiplayer UI and state
│   │   ├── online-score-sync.js  # Real-time score sync
│   │   └── ...
│   ├── constants/          # Game constants
│   │   ├── colors.js       # Color schemes
│   │   └── playlists.js    # Curated playlists
│   ├── lib/                # Utility libraries
│   │   └── multiplayer-client.js  # Socket.IO client
│   ├── state/              # State management
│   │   └── index.js        # A-Frame state component
│   ├── templates/          # HTML templates
│   │   ├── menu.html       # Main menu UI
│   │   ├── modes.html      # Mode selection
│   │   └── online.html     # Multiplayer UI
│   ├── workers/            # Web workers
│   │   └── parse-beatmap.js
│   └── scene.html          # Main A-Frame scene
├── assets/                 # Game assets
│   ├── fonts/              # Custom fonts
│   ├── img/                # Images and textures
│   ├── models/             # 3D models
│   └── sounds/             # Audio files
├── vendor/                 # Third-party libraries
│   └── aframe-master.js    # A-Frame VR framework
├── build/                  # Build scripts
├── index.html              # Entry point
├── webpack.config.js       # Webpack configuration
└── package.json            # Dependencies
```

---

## 🔌 Server API

### REST Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Serve the game |
| `GET /api/health` | Server health check |
| `GET /api/rooms/:code` | Get room information |
| `GET /api/stats` | Server statistics |

### WebSocket Events

#### Client → Server

| Event | Description |
|-------|-------------|
| `createRoom` | Create a new multiplayer room |
| `joinRoom` | Join an existing room |
| `leaveRoom` | Leave current room |
| `selectChallenge` | Select a song (host only) |
| `startGame` | Start the game (host only) |
| `updateScore` | Send score updates |
| `gameFinished` | Signal game completion |

#### Server → Client

| Event | Description |
|-------|-------------|
| `roomCreated` | Room successfully created |
| `roomJoined` | Successfully joined a room |
| `playerJoined` | New player joined |
| `playerLeft` | Player left the room |
| `challengeSelected` | Song was selected |
| `gameStarting` | Countdown beginning |
| `countdown` | Countdown tick (3, 2, 1) |
| `gameStarted` | Game has started |
| `scoreUpdate` | Player score update |
| `gameResults` | Final game results |

---

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `NODE_ENV` | development | Environment mode |

### Build Requirements

```bash
# Required for webpack with newer Node.js versions
NODE_OPTIONS=--openssl-legacy-provider npm run dist
```

---

## 🎨 Color Schemes

Aurora Rider includes 10 beautiful color schemes:

- **Super Medium** (Default) - Pink & Cyan
- **Star Warrior** - Blue & Orange
- **Magic Girl** - Purple & Pink
- **Matrix** - Green & Lime
- **Honey Bee** - Yellow & Brown
- **K-Pop** - Red & White
- **Mint Choco** - Mint & Teal
- **Cheetah SoL** - Orange & Gray
- **Nordic Noir** - Monochrome
- **Grayscale** - Black & White

Change schemes in-game via the **OPTIONS** menu.

---

## 🆚 Changes from Moon Rider

Aurora Rider is a fork of [Moon Rider](https://github.com/supermedium/moonrider) with these additions:

### ✅ New Features

- **Online Multiplayer** - Real-time competitive play with friends
- **Room System** - Private rooms with join codes
- **Live Leaderboards** - See scores during gameplay
- **Waiting Screen** - For players who finish early
- **Updated Branding** - Aurora Rider name and styling

### 📁 New Files

- `server/index.js` - Express + Socket.IO multiplayer server
- `src/lib/multiplayer-client.js` - WebSocket client
- `src/components/online-mode.js` - Online UI component
- `src/components/online-score-sync.js` - Score synchronization
- `src/templates/online.html` - Multiplayer UI panels

### 🔧 Modified Files

- `src/state/index.js` - Added online state properties
- `src/components/song.js` - Online game completion events
- `src/templates/modes.html` - Added Online Mode button
- `package.json` - Added Socket.IO dependencies

---

## � Bug Fixes (v2.10)

### Online Multiplayer Fixes

- **Fixed: Search keyboard kicking from lobby** - When the host was in the online lobby and opened the song selector, typing on the search keyboard would accidentally trigger the Leave button. Added `!isSearching` condition to the Leave button's raycastability.

- **Fixed: Play Again/Leave buttons not working in VR** - After completing an online game, the buttons on the results screen didn't respond to VR controller clicks. The VR raycasters weren't being activated for online screens. Added `onlineMenuActive`, `onlineInResults`, and `onlineWaitingForPlayers` to the raycaster activation conditions.

- **Fixed: Try Again causing stuck on road** - Clicking "Play Again" after an online game would leave the player stuck on the road with no menu. The `gamemenurestart` handler now properly resets all online-related states.

- **Fixed: Play Again button not calling server** - The "Play Again" button on the results screen now properly calls `returnToLobby()` on the server to synchronize all players.

- **Fixed: Button overlap on results screen** - The "Play Again" and "Leave" buttons on the online results screen were overlapping. Reduced button width from 1.15 to 0.85 and increased spacing from 0.7 to 1.0 units apart.

### Technical Details

| Issue | File | Fix |
|-------|------|-----|
| Leave button raycastable during search | `src/templates/menu.html` | Added `&& !isSearching` to raycastability condition |
| VR raycaster not active on results | `src/state/index.js` | Added online states to `anyMenuOpen` computation |
| Game restart not resetting online state | `src/state/index.js` | Added online state resets to `gamemenurestart` |
| Play Again not syncing with server | `src/components/online-mode.js` | Added `onlineplayagain` event listener |
| Button overlap | `src/templates/online.html` | Adjusted button geometry and positions |

---

## �🙏 Credits

- **Original Game**: [Moon Rider](https://github.com/supermedium/moonrider) by [Supermedium](https://supermedium.com)
- **Lead Developer**: [@ngokevin](https://github.com/ngokevin)
- **Song Maps**: [BeatSaver](https://beatsaver.com) community
- **Framework**: [A-Frame](https://aframe.io) WebVR framework
- **3D Engine**: [Three.js](https://threejs.org)

---

## 📄 License

MIT License - Feel free to use, modify, and distribute!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**🎮 Enjoy slashing beats with your friends! 🎵**

*Made with ❤️ for the VR community*
