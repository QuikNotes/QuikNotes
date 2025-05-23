import Sidebar from '../components/Sidebar'
import NoteList from '../components/NoteList'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar />
      <main className="flex-1 p-10">
        <NoteList />
      </main>
    </div>
  )
}
