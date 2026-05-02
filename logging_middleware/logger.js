export async function Log(stack, level, pkg, message) {
    // Note: 'package' is a reserved word in strict mode, using 'pkg' as parameter name
    const token = localStorage.getItem("access_token"); 
    
    const payload = {
        stack: stack,        
        level: level,       
        package: pkg,   
        message: message    
    };

    try {
        const response = await fetch("http://20.207.122.201/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Logging failed with status:", response.status);
        }
    } catch (error) {
        console.error("Failed to send log to server", error);
    }
}
