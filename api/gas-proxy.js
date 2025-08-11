export default async function handler(req, res) {
  const targetUrl = "https://script.google.com/macros/s/AKfycbyWEhO7ewpOldUzZwZktmIlaiQh_-ATawzOr_QuCp86DH40cYWLcIL97EZSxFq_vs8a/exec";
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
