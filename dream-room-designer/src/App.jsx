
import { useState } from "react";
import "./App.css";

const furnitureItems = [
  { emoji: "🛏️", name: "Bed" },
  { emoji: "🛋️", name: "Sofa" },
  { emoji: "🪑", name: "Chair" },
  { emoji: "🪴", name: "Plant" },
  { emoji: "🖼️", name: "Painting" },
  { emoji: "💡", name: "Lamp" },
  { emoji: "🧸", name: "Teddy" },
  { emoji: "📚", name: "Bookshelf" },
];

const colors = [
  { name: "Blush Pink", value: "#f5d8df" },
  { name: "Lavender", value: "#ded7f5" },
  { name: "Sky Blue", value: "#d4e9f7" },
  { name: "Mint Green", value: "#d9eddf" },
  { name: "Cream", value: "#f5e9d3" },
  { name: "Peach", value: "#f8d8c5" },
];

function App() {
  const [wallColor, setWallColor] = useState("#f5d8df");
  const [floorColor, setFloorColor] = useState("#c99b78");
  const [furniture, setFurniture] = useState([
    { ...furnitureItems[0], id: 1, x: 30, y: 65 },
    { ...furnitureItems[3], id: 2, x: 77, y: 75 },
  ]);
  const [roomName, setRoomName] = useState("My Dream Room");
  const [selectedStyle, setSelectedStyle] = useState("Cozy");
  const [message, setMessage] = useState("");

  function addFurniture(item) {
    const newItem = {
      ...item,
      id: Date.now() + Math.random(),
      x: 25 + Math.random() * 50,
      y: 45 + Math.random() * 35,
    };

    setFurniture((previous) => [...previous, newItem]);
    setMessage(`${item.name} added to your room! ✨`);
  }

  function removeFurniture(id) {
    setFurniture((previous) => previous.filter((item) => item.id !== id));
    setMessage("Furniture removed! 🪄");
  }

  function changeStyle(style) {
    setSelectedStyle(style);

    const styles = {
      Cozy: { wall: "#f5d8df", floor: "#c99b78" },
      Minimal: { wall: "#f2eee7", floor: "#d7c8b5" },
      Lavender: { wall: "#ded7f5", floor: "#b6a3c9" },
      Nature: { wall: "#d9eddf", floor: "#b89b78" },
    };

    setWallColor(styles[style].wall);
    setFloorColor(styles[style].floor);
    setMessage(`${style} style selected! 🌷`);
  }

  function resetRoom() {
    setWallColor("#f5d8df");
    setFloorColor("#c99b78");
    setFurniture([
      { ...furnitureItems[0], id: 1, x: 30, y: 65 },
      { ...furnitureItems[3], id: 2, x: 77, y: 75 },
    ]);
    setRoomName("My Dream Room");
    setSelectedStyle("Cozy");
    setMessage("Your room has been reset! 💗");
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="logo" href="#home">
          🏡 Dream<span>Space</span>
        </a>

        <nav>
          <a href="#designer">Designer</a>
          <a href="#furniture">Furniture</a>
          <a href="#colors">Colors</a>
        </nav>

        <button className="reset-btn" onClick={resetRoom}>
          ↻ Reset Room
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">✦ YOUR LITTLE DESIGN STUDIO ✦</span>

            <h1>
              Imagine it.
              <br />
              <span>Design it.</span>
              <br />
              Love it. 💗
            </h1>

            <p>
              Create your happy place! Choose your favorite colors,
              decorate your room, and bring your dream space to life.
            </p>

            <a href="#designer" className="primary-btn">
              Start Designing ↗
            </a>

            <div className="hero-note">
              🌷 Your room, your rules, your beautiful world.
            </div>
          </div>

          <div className="hero-art" aria-label="Illustration of a cozy room">
            <div className="sun">☀️</div>
            <div className="art-window">
              <span>☁️</span>
              <span>🌷</span>
            </div>
            <div className="art-bed">
              <div className="pillow" />
              <div className="blanket" />
              <div className="bed-leg left" />
              <div className="bed-leg right" />
            </div>
            <div className="art-plant">🪴</div>
            <div className="art-lamp">💡</div>
            <div className="art-rug" />
            <span className="floating-heart">♡</span>
            <span className="floating-star">✦</span>
          </div>
        </section>

        <section className="designer-section" id="designer">
          <div className="section-heading">
            <div>
              <span className="eyebrow">✦ LET YOUR CREATIVITY BLOOM ✦</span>
              <h2>Design your dream room</h2>
              <p>Every little detail makes it yours.</p>
            </div>

            <div className="room-count">
              <span>🪄</span>
              <div>
                <strong>{furniture.length} items</strong>
                <small>in your room</small>
              </div>
            </div>
          </div>

          <div className="workspace">
            <div className="room-panel">
              <div className="room-toolbar">
                <input
                  className="room-name"
                  value={roomName}
                  onChange={(event) => setRoomName(event.target.value)}
                  aria-label="Room name"
                  maxLength={40}
                />
                <span className="live-badge">
                  <span /> LIVE PREVIEW
                </span>
              </div>

              <div
                className="room-canvas"
                style={{ "--wall": wallColor, "--floor": floorColor }}
              >
                <div className="ceiling-line" />
                <div className="room-window">
                  <div className="window-sky">☁️</div>
                  <div className="window-cross-v" />
                  <div className="window-cross-h" />
                </div>

                <div className="wall-picture">🌼</div>
                <div className="wall-clock">◷</div>

                <div className="floor" />

                {furniture.map((item) => (
                  <button
                    key={item.id}
                    className="placed-item"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                    }}
                    onClick={() => removeFurniture(item.id)}
                    title={`Remove ${item.name}`}
                    aria-label={`Remove ${item.name}`}
                  >
                    <span>{item.emoji}</span>
                    <small>×</small>
                  </button>
                ))}

                {furniture.length === 0 && (
                  <div className="empty-room">
                    <span>🪄</span>
                    <p>Your room is waiting for a little magic!</p>
                    <small>Add furniture below to get started.</small>
                  </div>
                )}

                <div className="room-hint">
                  ✨ Tap a furniture item to remove it
                </div>
              </div>

              <div className="room-footer">
                <span>🏠 {roomName || "My Dream Room"}</span>
                <span>🎨 {selectedStyle} style</span>
              </div>

              <p className="feedback" aria-live="polite">
                {message || "Your imagination is the only limit! 💕"}
              </p>
            </div>

            <aside className="controls">
              <div className="control-card" id="colors">
                <div className="control-title">
                  <span className="control-icon">🎨</span>
                  <div>
                    <h3>Wall colors</h3>
                    <p>Pick your happy shade</p>
                  </div>
                </div>

                <div className="color-grid">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      className={`color-option ${
                        wallColor === color.value ? "active" : ""
                      }`}
                      onClick={() => {
                        setWallColor(color.value);
                        setMessage(`${color.name} walls selected! 🎨`);
                      }}
                      aria-label={color.name}
                      title={color.name}
                      style={{ "--swatch": color.value }}
                    >
                      <span />
                      <small>{color.name}</small>
                    </button>
                  ))}
                </div>

                <label className="custom-color">
                  <span>Custom wall color</span>
                  <input
                    type="color"
                    value={wallColor}
                    onChange={(event) => {
                      setWallColor(event.target.value);
                      setMessage("Your custom color is ready! 💗");
                    }}
                    aria-label="Choose custom wall color"
                  />
                </label>
              </div>

              <div className="control-card">
                <div className="control-title">
                  <span className="control-icon">🪵</span>
                  <div>
                    <h3>Floor color</h3>
                    <p>Set the room's foundation</p>
                  </div>
                </div>

                <div className="floor-options">
                  {[
                    { name: "Oak", value: "#c99b78" },
                    { name: "Light", value: "#e2d0b7" },
                    { name: "Walnut", value: "#987052" },
                    { name: "Rose", value: "#cba1a6" },
                  ].map((color) => (
                    <button
                      key={color.value}
                      className={`floor-swatch ${
                        floorColor === color.value ? "active" : ""
                      }`}
                      style={{ "--swatch": color.value }}
                      onClick={() => {
                        setFloorColor(color.value);
                        setMessage(`${color.name} floor selected! 🪵`);
                      }}
                      aria-label={`${color.name} floor`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="control-card">
                <div className="control-title">
                  <span className="control-icon">✨</span>
                  <div>
                    <h3>Room vibes</h3>
                    <p>Find your favorite style</p>
                  </div>
                </div>

                <div className="style-list">
                  {[
                    { name: "Cozy", emoji: "🧸" },
                    { name: "Minimal", emoji: "🤍" },
                    { name: "Lavender", emoji: "💜" },
                    { name: "Nature", emoji: "🌿" },
                  ].map((style) => (
                    <button
                      key={style.name}
                      className={`style-option ${
                        selectedStyle === style.name ? "active" : ""
                      }`}
                      onClick={() => changeStyle(style.name)}
                    >
                      <span>{style.emoji}</span>
                      {style.name}
                      <span className="style-check">
                        {selectedStyle === style.name ? "✓" : "+"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="furniture-section" id="furniture">
          <div className="section-heading furniture-heading">
            <div>
              <span className="eyebrow">✦ THE FUN PART ✦</span>
              <h2>Pick your furniture</h2>
              <p>Little things make a house feel like home.</p>
            </div>
            <span className="collection-label">YOUR COLLECTION ♡</span>
          </div>

          <div className="furniture-grid">
            {furnitureItems.map((item, index) => (
              <button
                key={item.name}
                className="furniture-card"
                style={{ "--delay": `${index * 0.06}s` }}
                onClick={() => addFurniture(item)}
              >
                <span className="furniture-emoji">{item.emoji}</span>
                <strong>{item.name}</strong>
                <span className="add-label">+ Add to room</span>
              </button>
            ))}
          </div>
        </section>

        <section className="inspiration">
          <span>🌸</span>
          <div>
            <h2>A little space, a lot of happiness.</h2>
            <p>
              There are no wrong choices when you design a space that feels
              like you.
            </p>
          </div>
          <a href="#designer">Keep creating ↑</a>
        </section>
      </main>

      <footer>
        <a className="logo" href="#home">
          🏡 Dream<span>Space</span>
        </a>
        <p>Made with ♡ and a little imagination.</p>
        <span>© 2026 DreamSpace Studio</span>
      </footer>
    </div>
  );
}

export default App;