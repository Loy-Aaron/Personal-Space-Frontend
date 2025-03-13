import { useEffect, useState } from "react"
import useDiaryStore from "../store/diaryStore"
import { X } from "lucide-react"
import SubmitButton from "./SubmitButton"

const EditEntry = () => {
    const { setShowEditEntry, entryData, updateEntry } = useDiaryStore()
    
    const [updateData, setUpdateData] = useState({
        date: entryData.date,
        text: entryData.text
    })

    const [isDisabled, setIsDisabled] = useState(false)

    const handleChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (!updateData.date || !updateData.text) return setIsDisabled(true)
        setIsDisabled(false)
    }, [updateData])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateEntry(entryData._id, updateData)
    }
    
    return (
        <div className='fixed top-1/2 left-1/2 -translate-1/2 w-9/10 p-4 rounded-2xl flex flex-col gap-4 bg-gray-700'>
            <p className='text-3xl font-bold text-amber-50'>New Entry</p>
            <X onClick={() => setShowEditEntry(false)} className='absolute right-4 hover:cursor-pointer' />
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <input type="date" name="date" value={updateData.date} onChange={handleChange} className="w-max outline-none hover:cursor-pointer bg-gray-400 text-slate-950 py-2 px-4 rounded-xl focus:ring-2 focus:ring-blue-500" />
                < textarea name="text" value={updateData.text} onChange={handleChange} rows={10} className='custom-textarea w-full border-2 border-slate-950 rounded-xl outline-none focus:border-blue-500 py-2 px-4 text-slate-950 bg-gray-400'></textarea>
                <SubmitButton isDisabled={isDisabled} width='w-max'>Save</SubmitButton>
            </form>
        </div>
    )
}

export default EditEntry