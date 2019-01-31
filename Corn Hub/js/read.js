function read(id, text, timeout, sayDone)
{
    setTimeout(() =>
    {
        let thing = document.getElementById(id);

        let splitUp = text.split(' ');

        let i = 0;

        let interval = setInterval(() =>
        {
            if(i >= splitUp.length)
            {
                clearInterval(interval);

                if(sayDone)
                    thing.innerHTML = 'Done!';
            }
            else
            {
                thing.innerHTML = splitUp[i];

                console.log('did a thing');
                i++;
            }
        }, (60 * 1000) / 500.0); // About 500 words per minute is what the brain can process
    }, timeout ? timeout : 0);
}

function initReader()
{
    $("#read-form").on('submit', function(e)
    {
        e.preventDefault();

        let text = $('#speedread').val();

        if(!text)
            alert('Fill in the text box below of what to speed read!');
        else
        {
            read('wordsHere', '10 9 8 7 6 5 4 3 2 1', 0, false);
            read('wordsHere', text, 1200, true);
        }

        return false;
    });
}