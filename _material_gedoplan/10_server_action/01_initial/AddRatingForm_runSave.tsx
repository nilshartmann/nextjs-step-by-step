async function runSave(formData: FormData) {
  const r = await saveNewRating(formData);

  if (r.status === "created") {
    setUsername("");
    setComment("");
    setStars("");
  }
}
