function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">TTcreator</p>
          <h1>DJ event timeline workspace</h1>
        </div>
        <span className="status-pill">MVP scaffold</span>
      </header>

      <section className="workspace-grid" aria-label="TTcreator workspace">
        <div className="panel">
          <h2>Event setup</h2>
          <p>Booths, availability, breaks, and preference windows will appear here.</p>
        </div>

        <div className="panel">
          <h2>Requests</h2>
          <p>Mini events and solo DJ requests will be listed here.</p>
        </div>

        <div className="panel panel-wide">
          <h2>Timeline</h2>
          <p>Manual booth assignment and validation results will be built in the next tasks.</p>
        </div>

        <div className="panel">
          <h2>DJ usage</h2>
          <p>Per-DJ booth usage counts and minutes will be summarized here.</p>
        </div>
      </section>
    </main>
  );
}

export default App;
