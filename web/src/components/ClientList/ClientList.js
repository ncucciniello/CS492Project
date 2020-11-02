import ClientListItem from 'src/components/ClientListItem'

const ClientList = (props) => {
  return (
    <div className="clientList">
      {props.clients.map((client) => (
        <ClientListItem
          key={client.id}
          user={client}
          refreshClients={props.refreshClients}
        />
      ))}
    </div>
  )
}

export default ClientList
