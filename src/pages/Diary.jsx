import { useEffect } from "react";
import useDiaryStore from "../store/diaryStore.js";
import CreateEntry from "../components/CreateEntry.jsx";
import { SquarePlus, Trash2, SquarePen } from "lucide-react";
import EditEntry from "../components/EditEntry.jsx";

const formatDate = (date) => {
  let formattedDate = new Date(date)
  formattedDate = formattedDate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  return formattedDate
}

const Diary = () => {
  const { showCreateEntry, setShowCreateEntry, diary, fetchDiary, showEditEntry, setShowEditEntry, deleteEntry, showConfirmDeletion, setShowConfirmDeletion, deleteDiary } = useDiaryStore();

  useEffect(() => {
    fetchDiary();
  }, []);

  return (
    <div className={`${diary.length === 0 ? 'flex flex-col' : 'px-8'}`}>
      {diary.length === 0 ? (
        <p className="text-gray-500 self-center">
          No entries found.{" "}
          <span
            className="text-blue-400 font-bold hover:underline hover:cursor-pointer"
            onClick={() => setShowCreateEntry(true)}
          >
            Create new entry
          </span>
        </p>
      ) : (
        <div>
          <div className="flex gap-5 items-baseline">
            <p className="text-6xl">Diary</p>
            <ul className="flex gap-3">
              <li>
                <SquarePlus
                  className="w-5 h-5 hover:cursor-pointer hover:text-gray-500"
                  onClick={() => setShowCreateEntry(true)}
                />
              </li>
              <li>
                <Trash2
                  className="w-5 h-5 hover:cursor-pointer hover:text-gray-500"
                  onClick={() => setShowConfirmDeletion(true)} />
              </li>
            </ul>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {diary.map((entry) => (
              <section key={entry._id} className="border-b border-gray-500">
                <ul className="flex items-center gap-5">
                  <li><span className="text-3xl">{formatDate(entry.date)}</span></li>
                  <li><SquarePen
                    className="w-5 h-5 hover:cursor-pointer hover:text-gray-500"
                    onClick={() => { setShowEditEntry(true, entry) }} /></li>
                  <li><Trash2
                    className="w-5 h-5 hover:cursor-pointer hover:text-gray-500"
                    onClick={() => deleteEntry(entry._id)} /></li>
                </ul>
                <p className="text-xl mt-4 indent-10 w-full break-words whitespace-pre-wrap">{entry.text}</p>
              </section>
            ))}
          </div>
        </div>
      )}

      {showCreateEntry && <CreateEntry />}
      {showEditEntry && <EditEntry />}
      {showConfirmDeletion &&
        <div className="fixed top-1/2 left-1/2 -translate-1/2 bg-gray-700 p-4 rounded-xl">
          <p className="text-2xl mb-3">Do you want to delete all entries?</p>
          <div className="w-full flex gap-3 justify-center">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 rounded-xl py-2 px-4"
              onClick={()=> deleteDiary()}
            >Confirm</button>
            <button 
            type="button" 
            className="bg-red-500 hover:bg-red-700 rounded-xl py-2 px-4"
            onClick={()=> setShowConfirmDeletion(false)}
            >Cancel</button>
          </div>
        </div>}
    </div>
  );
};

export default Diary;
