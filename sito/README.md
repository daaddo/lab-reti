# Presentazione Progetto Reti di Computer e Internet

Presentazione web per il progetto di configurazione di rete aziendale Amazin.com

## Autori
- Davide Cascella (mat. 383257)
- Matteo Migliorati (mat. 382784)

## Contenuto
Documentazione completa della configurazione di rete che include:
- Architettura di rete a stella con tratto a bus
- Configurazione di 5 edifici con routing RIP
- Server: Web (Apache2), Mail (Sendmail), DNS Master/Slave (Bind9), Backup, Nagios
- Configurazione Firewall interno ed esterno con iptables e NAT
- Backbone inter-router con IP 10.0.0.0/30

## Tecnologie Utilizzate
- HTML5, CSS3, JavaScript
- Font Awesome per le icone
- Design responsive con layout A3 per export PDF

## Esecuzione Locale (senza Docker)

Apri semplicemente il file `index.html` nel browser.

## Esecuzione con Docker

### Prerequisiti
- Docker installato

### Metodo 1: Utilizzo Immagine da Docker Hub (Raccomandato)

```bash
# Pull dell'immagine da Docker Hub
docker pull daaddo/labreti:latest

# Avvio del container
docker run -d -p 10000:80 --name lab-reti daaddo/labreti:latest

# Visualizza i logs
docker logs -f presentazione-lab-reti

# Ferma il container
docker stop presentazione-lab-reti

# Riavvia il container
docker start presentazione-lab-reti

# Rimuovi il container
docker rm presentazione-lab-reti
```

La presentazione sarà disponibile su: **http://localhost:8080**

### Metodo 2: Build Locale dell'Immagine

```bash
# Build dell'immagine locale
docker build -t presentazione-reti .

# Avvio del container
docker run -d -p 8080:80 --name presentazione-lab-reti presentazione-reti

# Visualizza i logs
docker logs -f presentazione-lab-reti

# Ferma e rimuovi il container
docker stop presentazione-lab-reti
docker rm presentazione-lab-reti
```

### Push su Docker Hub (per i maintainer)

```bash
# Login a Docker Hub
docker login

# Tag dell'immagine
docker tag presentazione-reti daaddo/labreti:latest

# Push dell'immagine
docker push daaddo/labreti:latest
```

### Comandi Utili

```bash
# Accedi al container in esecuzione
docker exec -it presentazione-lab-reti sh

# Verifica lo stato del container
docker ps

# Verifica le immagini scaricate
docker images

# Rimuovi l'immagine locale
docker rmi daaddo/labreti:latest

# Pull di una versione specifica
docker pull daaddo/labreti:v1.0
```

## Export PDF

1. Apri la presentazione nel browser
2. Premi `Ctrl+P` (o `Cmd+P` su Mac)
3. Seleziona "Salva come PDF" come destinazione
4. Imposta il formato carta su **A3**
5. Assicurati che "Grafiche di sfondo" sia abilitato
6. Salva il PDF

## Navigazione

- **Frecce direzionali**: Naviga tra le slide
- **Touch/Swipe**: Su dispositivi mobili
- **Barra di progresso**: In alto indica la posizione nella presentazione
- **Indice cliccabile**: Nelle slide 2 e 3 per accesso rapido alle sezioni

## Struttura del Progetto

```
sito/
├── index.html              # Pagina principale con tutte le slide
├── styles.css              # Stili e layout A3
├── script.js               # Navigazione e interattività
├── images/                 # Immagini della topologia e consegne
├── Dockerfile              # Configurazione Docker
├── docker-compose.yml      # Orchestrazione container
├── .dockerignore          # File esclusi dal build
└── README.md              # Questa documentazione
```

## Note Tecniche

- Il container utilizza **Nginx Alpine** per prestazioni ottimali
- Compressione gzip abilitata per ridurre la banda
- Cache configurata per risorse statiche (immagini, CSS, JS)
- Porta esposta: **80** (mappata su 8080 dell'host)
- Network isolato per il frontend

## Licenza

Progetto accademico per il corso di Reti di Computer e Internet

