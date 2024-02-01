import React, { useState } from 'react';
import './Error.css'; // Importerer stiler fra Error.css

const ErrorLog = () => {
  // Tilstander for komponenten
  const [tickets, setTickets] = useState([]); // Liste over feilmeldinger
  const [errorInput, setErrorInput] = useState(''); // Inntastet feilmelding
  const [editingTicketId, setEditingTicketId] = useState(null); // ID for redigering av feilmelding

  // Funksjon for å rapportere en feil
  const handleReportError = () => {
    if (errorInput.trim() === '') {
      // Viser en advarsel hvis feilmeldingsfeltet er tomt
      alert('Feil: Skriv inn en feilmelding.');
      return;
    }

    // Oppretter en ny feilmelding
    const newTicket = {
      id: new Date().getTime(), // Unik ID basert på tidspunktet for opprettelsen
      message: errorInput,
      resolved: false,
    };

    // Legger til den nye feilmeldingen i listen
    setTickets([...tickets, newTicket]);
    // Nullstiller feilmeldingsfeltet
    setErrorInput('');
  };

  // Funksjon for å markere en feilmelding som løst
  const handleResolveTicket = (id) => {
    // Oppdaterer listen ved å markere feilmeldingen som løst
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, resolved: true } : ticket
    );

    setTickets(updatedTickets);
  };

  // Funksjon for å fjerne en feilmelding
  const handleRemoveTicket = (id) => {
    // Oppdaterer listen ved å fjerne feilmeldingen med gitt ID
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets);
  };

  // Funksjon for å starte redigering av en feilmelding
  const handleEditTicket = (id) => {
    // Setter ID for feilmelding som skal redigeres
    setEditingTicketId(id);
  };

  // Funksjon for å lagre endringer etter redigering
  const handleSaveEdit = (id, updatedMessage) => {
    // Oppdaterer listen med den redigerte feilmeldingen
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, message: updatedMessage } : ticket
    );

    setTickets(updatedTickets);
    // Nullstiller redigerings-ID
    setEditingTicketId(null);
  };

  // JSX for komponenten
  return (
    <div className="error-log-container">
      <h2 className="error-log-header">Feil og Tickets</h2>
      <div>
        {/* Inntastingsfelt for feilmelding */}
        <textarea
          className="error-input"
          placeholder="Skriv inn feilmelding..."
          value={errorInput}
          onChange={(e) => setErrorInput(e.target.value)}
        />
        {/* Knapp for å rapportere feil */}
        <button className="submit-button" onClick={handleReportError}>
          Meld Feil
        </button>
      </div>
      <div>
        <h3 className="error-log-header">Feillogg</h3>
        {/* Liste over feilmeldinger */}
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="ticket-item">
              {editingTicketId === ticket.id ? (
                // Redigeringsmodus: Viser tekstområde og lagre-knapp
                <>
                  <textarea
                    value={ticket.message}
                    onChange={(e) => handleSaveEdit(ticket.id, e.target.value)}
                  />
                  <button className="save-button" onClick={() => handleSaveEdit(ticket.id, ticket.message)}>
                    Lagre
                  </button>
                </>
              ) : (
                // Viser feilmelding, løst-status, fjern-knapp, rediger-knapp
                <>
                  <span>{ticket.message}</span>
                  <span>
                    {ticket.resolved ? (
                      // Hvis feilmelding er løst: Viser løst-status, fjern-knapp, rediger-knapp
                      <>
                        - Løst{' '}
                        <button className="remove-button" onClick={() => handleRemoveTicket(ticket.id)}>
                          Fjern
                        </button>
                        <button className="edit-button" onClick={() => handleEditTicket(ticket.id)}>
                          Rediger
                        </button>
                      </>
                    ) : (
                      // Hvis feilmelding ikke er løst: Viser løs-knapp, rediger-knapp
                      <>
                        <button className="resolve-button" onClick={() => handleResolveTicket(ticket.id)}>
                          Marker som løst
                        </button>
                        <button className="edit-button" onClick={() => handleEditTicket(ticket.id)}>
                          Rediger
                        </button>
                      </>
                    )}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ErrorLog;
